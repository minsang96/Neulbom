package com.neulbomi.neulbom.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.dto.DietDto;
import com.neulbomi.neulbom.entity.Diet;
import com.neulbomi.neulbom.entity.Food;
import com.neulbomi.neulbom.entity.Member;
import com.neulbomi.neulbom.entity.User;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.repository.DietRepository;
import com.neulbomi.neulbom.repository.FoodRepository;
import com.neulbomi.neulbom.repository.MemberRepository;
import com.neulbomi.neulbom.util.TimeUtils;

@Service
public class DietServiceImpl implements DietService {
	
	@Autowired
	DietRepository dietRepository;
	
	@Autowired
	UserService userService;
	
	@Autowired
	AwsS3Service aswS3Service;

	@Autowired
	FoodRepository foodRepository;
	
	@Autowired
	MemberRepository memberRepository;
	
	@Override
	public void recordDiet(ArrayList<DietDto> dietDtoList) {
		// 현재 시간
		String now = TimeUtils.curTime();
		
		User user = userService.getUserByUserSeq(dietDtoList.get(0).getUserSeq());
		if(user == null) throw new NotExistsUserException();
		
		for (int n = 0; n < dietDtoList.size(); n++) {
			DietDto dietDto = dietDtoList.get(n);
			dietRepository.save(Diet.builder()
					.userSeq(dietDto.getUserSeq())
					.dietTime(dietDto.getDietTime())
					.foodCode(dietDto.getFoodCode())
					.dietImg(dietDto.getDietImg())
					.dietAmount(dietDto.getFoodAmount())
					.dietDate(dietDto.getDietDate())
					.regDt(now)
					.regEmail(user.getUserEmail())
					.modDt(now)
					.modEmail(user.getUserEmail())
					.build());
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public HashMap<String, Object> dietDaily(int userSeq, String dietDate) {
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());

		// 칼로리, 탄수화물, 단백질, 지방, 나트륨, 설탕
		//    0,       1,    2,   3,    4,   5
		String[] nutrients = {"kcal" ,"carbohydrate", "protein", "fat", "natrium", "sugars"};
		String[] time = {"breakfast", "lunch", "dinner"};
		
		HashMap<String, double[]> nutrientSum = new HashMap<>();
		HashMap<String, ArrayList<JSONObject>> dietList = new HashMap<>();
		for (String t : time) {
			nutrientSum.put(t, new double[6]);
			ArrayList<JSONObject> list = new ArrayList<>();
			dietList.put(t, list);
		}
		
		List<Diet> diets = dietRepository.findDailyDiet(userSeq, dietDate);
		for (Diet diet : diets) {
			// 사용자가 섭취한 양 g
			double amount = diet.getDietAmount(); 
			// 사용자가 먹은 음식 정보
			Food food = foodRepository.findFood(diet.getFoodCode());
			
			// 아침/점심/저녁에 해당하는 거 불러오기
			double[] sum = nutrientSum.get(diet.getDietTime());
			double times = amount / food.getFoodAmount();
			
			// 아침/점심/저녁 별로 칼로리/탄수화물/단백질/지방/나트룸/당 합 구하기
			if(food.getFoodKcal() != null) 			sum[0] += (food.getFoodKcal() * times);
			if(food.getFoodCarbohydrate() != null)  sum[1] += (food.getFoodCarbohydrate() * times);
			if(food.getFoodProtein() != null) 		sum[2] += (food.getFoodProtein() * times);
			if(food.getFoodFat() != null) 			sum[3] += (food.getFoodFat() * times);
			if(food.getFoodNatrium() != null) 		sum[4] += (food.getFoodNatrium() * times);
			if(food.getFoodSugars() != null)	 	sum[5] += (food.getFoodSugars() * times);
			nutrientSum.replace(diet.getDietTime(), sum);
			
			// 음식 리스트 넣기
			ArrayList<JSONObject> list = dietList.get(diet.getDietTime());
			JSONObject obj = new JSONObject();
			obj.put("dietSeq", diet.getDietSeq());
			obj.put("dietTime", diet.getDietTime());
			obj.put("dietImg", diet.getDietImg());
			obj.put("dietAmount", diet.getDietAmount());
			
			// 원래 음식의 영양 정보
			obj.put("foodSeq", food.getFoodSeq());
			obj.put("foodCode", food.getFoodCode());
			obj.put("foodName", food.getFoodName());
			obj.put("foodAmount", food.getFoodAmount());
			obj.put("foodKcal", food.getFoodKcal());
			obj.put("foodCarbohydrate", food.getFoodCarbohydrate());
			obj.put("foodProtein", food.getFoodProtein());
			obj.put("foodFat", food.getFoodFat());
			obj.put("foodNatrium", food.getFoodNatrium());
			obj.put("foodSugars", food.getFoodSugars());
			obj.put("foodCalcium", food.getFoodCalcium());
			obj.put("foodPhosphorus", food.getFoodPhosphorus());
			obj.put("foodKalium", food.getFoodKalium());
			obj.put("foodMagnesium", food.getFoodMagnesium());
			obj.put("foodIron", food.getFoodIron());
			obj.put("foodZinc", food.getFoodZinc());
			obj.put("foodCholesterol", food.getFoodCholesterol());
			obj.put("foodTransfat", food.getFoodTransfat());
			list.add(obj);
			dietList.replace(diet.getDietTime(), list);
		}
		
		HashMap<String, Object> result = new HashMap<>();
		
		Map<String, Object> total = new HashMap<>();
		int totalKcal = 0;
		int totalCarbohydrate = 0;
		int totalProtein = 0;
		int totalFat = 0;
		int totalNatrium = 0;
		int totalSugars = 0;
		 
		for (String t : time) {
			JSONObject obj = new JSONObject();
			
			// 아침/점심/저녁 각 영양분 총합
			double[] nsum = nutrientSum.get(t);
			totalKcal += nsum[0];
			totalCarbohydrate += nsum[1];
			totalProtein += nsum[3];
			totalFat += nsum[4];
			totalNatrium += nsum[4];
			totalSugars += nsum[5];
			
			JSONObject totalNutrients = new JSONObject();
			for (int n = 0; n < nutrients.length; n++) {
				totalNutrients.put(nutrients[n], (int) nsum[n]);
			}
			obj.put("total", totalNutrients);
			obj.put("dietList", dietList.get(t));
			
			result.put(t, obj);
		}
		total.put("kcal", totalKcal);
		total.put("carbohydrate", totalCarbohydrate);
		total.put("protein", totalProtein);
		total.put("fat", totalFat);
		total.put("natrium", totalNatrium);
		total.put("sugars", totalSugars);
		
		result.put("total", total);
		
		// 사용자 권장 섭취량
		Map<String, Object> rec = new HashMap<>();
		int kcal = member.getMemberKcal();
		rec.put("kcal", kcal);
		rec.put("carbohydrate", kcal * 0.6 / 4);
		rec.put("protein", kcal * 0.15 / 4);
		rec.put("fat", kcal * 0.2 / 9);
		rec.put("sugars", kcal * 0.1 / 4);
		rec.put("natrium", 2000);
		
		result.put("recommend", rec);
		
		return result;
	}

	@Override
	public void removeDiet(long[] dietSeqs) {
		for (long dietSeq : dietSeqs) {
			Diet diet = dietRepository.findByDelYnAndDietSeq("n", dietSeq);
			diet.setDelYn("y");
			dietRepository.save(diet);
		}
	}
}
