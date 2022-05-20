package com.neulbomi.neulbom.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.entity.BloodPressure;
import com.neulbomi.neulbom.entity.BloodSugar;
import com.neulbomi.neulbom.entity.Diet;
import com.neulbomi.neulbom.entity.Food;
import com.neulbomi.neulbom.entity.Member;
import com.neulbomi.neulbom.entity.Other;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.repository.BloodPressureRepository;
import com.neulbomi.neulbom.repository.BloodSugarRepository;
import com.neulbomi.neulbom.repository.DietRepository;
import com.neulbomi.neulbom.repository.FoodRepository;
import com.neulbomi.neulbom.repository.MemberRepository;
import com.neulbomi.neulbom.repository.OtherRepository;
import com.neulbomi.neulbom.util.DateUtils;

@Service
public class ReportServiceImpl implements ReportService {

	@Autowired
	MemberRepository memberRepository;

	@Autowired
	BloodSugarRepository bsRepository;

	@Autowired
	BloodPressureRepository bpRepository;

	@Autowired
	DietRepository dietRepository;

	@Autowired
	FoodRepository foodRepository;
	
	@Autowired
	OtherRepository otherRepository;
	
	DateUtils dateUtils;
	
// ********************************* DAILY *********************************
	
	// 혈당
	@Override
	public Map<String, Object> readDailyBS(int userSeq, String date) {
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());

		Map<String, Object> result = new HashMap<>();
		String yesterday = dateUtils.returnLastDate(date, -1);

		result.put("today", calcBS(userSeq, date));
		result.put("yesterday", calcBS(userSeq, yesterday));

		return result;
	}


	// 혈압
	@Override
	public Map<String, Object> readDailyBP(int userSeq, String date) {
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());

		Map<String, Object> result = new HashMap<>();
		String yesterday = dateUtils.returnLastDate(date, -1);

		result.put("today", calcBP(userSeq, date));
		result.put("yesterday", calcBP(userSeq, yesterday));

		return result;
	}

	// 칼로리
	@Override
	public Map<String, Object> readDailyKcal(int userSeq, String date) {
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());

		Map<String, Object> result = new HashMap<>();
		String yesterday = dateUtils.returnLastDate(date, -1);
		String mode = "daily";

		result.put("today", calcKcal(userSeq, date, "", mode));
		result.put("yesterday", calcKcal(userSeq, yesterday, "", mode));

		return result;
	}


	// 영양소
	@Override
	public Map<String, Object> readDailyNutrient(int userSeq, String date) {
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());
		
		Map<String, Object> result = new HashMap<>();
		
		result.put("recommend", calcRecNutrient(userSeq, "daily"));
		result.put("intake", calcIntakeNutrient(userSeq, date, "", "daily"));
		
		return result;
	}
	
	// 기타 기록
	@Override
	public Map<String, Object> readDailyOther(int userSeq, String date) {
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());
		
		Map<String, Object> result = new HashMap<>();
		List<Other> other = otherRepository.findUserOther(userSeq, date, date);
		
		// 초기 값 설정
		result.put("coffee", "n");
		result.put("alcohol", "n");
		result.put("exercise", "n");

		if (other.size() != 0) {
			for (int i = 0; i < other.size(); i++) {
				result.put(other.get(i).getCode(), "y");
			}
		}
		return result;
	}

// ********************************* WEEKLY *********************************
	
	// 혈당	
	@Override 
	public Map<String, Object> readWeeklyBS(int userSeq, String date) {
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());

		Map<String, Object> result = new HashMap<>();
		List<String> days = dateUtils.getDaysOfWeek(date, 2);
		List<String> day7 = dateUtils.getDaysOfWeek(date, 7);
		
		for (int i = 0; i < 7; i++) {
			result.put(day7.get(i), 0);
		}
		
		String startDate = days.get(0);
		String endDate = days.get(1);
		
		List<BloodSugar> bs = bsRepository.findBBWeeklyBS(userSeq, startDate, endDate);
		for (int i = 0; i < bs.size(); i++) {
			result.put(bs.get(i).getBsDate(), bs.get(i).getBsLevel());
		}
		return result;
	}
	
	// 혈압
	@Override
	public Map<String, Object> readWeeklyBP(int userSeq, String date) {
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());

		Map<String, Object> result = new HashMap<>();
		List<String> days = dateUtils.getDaysOfWeek(date, 7);

		for (int i = 0; i < 7; i++) {
			List<BloodPressure> today = bpRepository.findUserDailyBP(userSeq, days.get(i));
			int cnt = today.size();

			int bpHigh = 0;
			int bpLow = 0;
			for (int c = 0; c < cnt; c++) {
				bpHigh += today.get(c).getBpHigh();
				bpLow += today.get(c).getBpLow();
			}

			Map<String, Object> obj = new HashMap<>();
			if(cnt == 0) cnt = 1;
			obj.put("BpHigh", bpHigh / cnt);
			obj.put("BpLow", bpLow / cnt);
			result.put(days.get(i), obj);
		}

		return result;
	}
	
	// 칼로리
	@Override
	public Map<String, Object> readWeeklyKcal(int userSeq, String date) {
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());
		String mode = "weekly";
		Map<String, Object> result = new HashMap<>();
		
		// 이번주 섭취 칼로리
		List<String> days = dateUtils.getDaysOfWeek(date, 2);
		String startDate = days.get(0);
		String endDate = days.get(1);
		result.put("this", (int) calcKcal(userSeq, startDate, endDate, mode) / 7);
		
		// 저번주 섭취 칼로리
		String last = dateUtils.returnLastDate(date, -7);
		days = dateUtils.getDaysOfWeek(last, 2);
		startDate = days.get(0);
		endDate = days.get(1);
		result.put("last", (int) calcKcal(userSeq, startDate, endDate, mode) / 7);

		return result;
	}
	
	// 영양소
	@Override
	public Map<String, Object> readWeeklyNutrient(int userSeq, String date) {
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());
		Map<String, Object> result = new HashMap<>();
		List<String> days = dateUtils.getDaysOfWeek(date, 2);

		String startDate = days.get(0);
		String endDate = days.get(1);
		
		result.put("recommend", calcRecNutrient(userSeq, "weekly"));
		result.put("intake", calcIntakeNutrient(userSeq, startDate, endDate, "weekly"));
		return result;
	}
	
// ********************************* 함수 *********************************

	// 혈당 처리
	public Map<String, Object> calcBS(int userSeq, String date) {
		List<BloodSugar> bs = bsRepository.findUserDailyBS(userSeq, date);
		Map<String, Object> obj = new HashMap<>();
		
		// 초기 값 설정
		obj.put("beforeBreakfast", 0);
		obj.put("afterBreakfast", 0);
		obj.put("beforeLunch", 0);
		obj.put("afterLunch", 0);
		obj.put("beforeDinner", 0);
		obj.put("afterDinner", 0);

		if (bs.size() != 0) {
			for (int i = 0; i < bs.size(); i++) {
				obj.put(bs.get(i).getBsCode(), bs.get(i).getBsLevel());
			}
		}
		return obj;
	}
	
	// 혈압 처리
	public Map<String, Object> calcBP(int userSeq, String date) {
		List<BloodPressure> bp = bpRepository.findUserDailyBP(userSeq, date);
		Map<String, Object> obj = new HashMap<>();

		// 초기 값 설정
		Map<String, Object> level = new HashMap<>();
		level.put("BpHigh", 0);
		level.put("BpLow", 0);
		obj.put("breakfast", level);
		obj.put("lunch", level);
		obj.put("dinner", level);

		if (bp.size() != 0) {
			for (int i = 0; i < bp.size(); i++) {
				Map<String, Object> obj2 = new HashMap<>();
				obj2.put("BpHigh", bp.get(i).getBpHigh());
				obj2.put("BpLow", bp.get(i).getBpLow());
				obj.put(bp.get(i).getBpCode(), obj2);
			}
		}
		return obj;
	}

	// 칼로리 계산
	public double calcKcal(int userSeq, String startDate, String endDate, String mode) {
		double kcalTotal = 0;

		List<Diet> diet = null;
		
		// daily
		if(mode.equals("daily")) 
			diet = dietRepository.findDailyDiet(userSeq, startDate);
		// weekly
		else
			diet = dietRepository.findWeeklyDiet(userSeq, startDate, endDate);

		for (int i = 0; i < diet.size(); i++) {
			Diet target = diet.get(i);
			String fc = target.getFoodCode();
			int amount = target.getDietAmount();
			Food food = foodRepository.findFood(fc);
			kcalTotal += food.getFoodKcal() * amount / food.getFoodAmount();
		}
		return kcalTotal;
	}
	
	// 권장 영양소 계산
	public Map<String, Object> calcRecNutrient(int userSeq, String mode) {
		int type = 0;
		
		// daily
		if (mode.equals("daily"))
			type = 1;
		// weekly
		else
			type = 7;
		
		Map<String, Object> rec = new HashMap<>();
		int kcal = memberRepository.findCalories(userSeq) * type;
		rec.put("kcal", kcal);
		rec.put("carbohydrate", kcal * 0.6 / 4);
		rec.put("protein", kcal * 0.15 / 4);
		rec.put("fat", kcal * 0.2 / 9);
		rec.put("sugars", kcal * 0.1 / 4);
		rec.put("natrium", 2000 * type);
		
		return rec;
	}
	
	// 섭취 영양소 계산
	public Map<String, Object> calcIntakeNutrient(int userSeq, String startDate, String endDate, String mode) {
		Map<String, Object> intake = new HashMap<>();
		
		List<Diet> diet = null;
		
		// daily
		if(mode.equals("daily"))
			diet = dietRepository.findDailyDiet(userSeq, startDate);
		// weekly
		else
			diet = dietRepository.findWeeklyDiet(userSeq, startDate, endDate);
		
		// 칼, 탄, 단, 지, 나, 당
		double foodKcal = 0;
		double foodCarbohydrate = 0;
		double foodProtein = 0;
		double foodFat = 0;
		double foodSugars = 0;
		double foodNatrium = 0;

		for (int i = 0; i < diet.size(); i++) {
			Diet target = diet.get(i);
			String fc = target.getFoodCode();
			double intakeAmount = target.getDietAmount();
			Food food = foodRepository.findFood(fc);
			double pivot = intakeAmount / food.getFoodAmount();
			
			foodKcal 		 += (food.getFoodKcal() == null ? 0 : food.getFoodKcal()) * pivot;
			foodCarbohydrate += (food.getFoodCarbohydrate() == null ? 0 : food.getFoodCarbohydrate()) * pivot;
			foodProtein		 += (food.getFoodProtein() == null ? 0 : food.getFoodProtein()) * pivot;
			foodFat			 += (food.getFoodFat() == null ? 0 : food.getFoodFat()) * pivot;
			foodSugars		 += (food.getFoodSugars() == null ? 0 : food.getFoodSugars())* pivot;
			foodNatrium += (food.getFoodNatrium() == null ? 0 : food.getFoodNatrium()) * pivot;
		}
		intake.put("kcal", foodKcal);
		intake.put("carbohydrate", foodCarbohydrate);
		intake.put("protein", foodProtein);
		intake.put("fat", foodFat);
		intake.put("sugars", foodSugars);
		intake.put("natrium", foodNatrium);
		
		return intake;
	}
	
}
