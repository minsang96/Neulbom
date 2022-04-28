package com.neulbomi.neulbom.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
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
import com.neulbomi.neulbom.entity.User;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.repository.BloodPressureRepository;
import com.neulbomi.neulbom.repository.BloodSugarRepository;
import com.neulbomi.neulbom.repository.DietRepository;
import com.neulbomi.neulbom.repository.FoodRepository;
import com.neulbomi.neulbom.repository.MemberRepository;
import com.neulbomi.neulbom.repository.UserRepository;

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

	// daily 혈당
	@Override
	public Map<String, Object> readDailyBS(int userSeq, String date) {
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());

		Map<String, Object> result = new HashMap<>();
		String yesterday = returnYesterday(date);

		result.put("today", calcBS(userSeq, date));
		result.put("yesterday", calcBS(userSeq, yesterday));

		return result;
	}

	public Map<String, Object> calcBS(int userSeq, String date) {
		List<BloodSugar> bs = bsRepository.findUserDailyBS(userSeq, date);
		Map<String, Object> obj = new HashMap<>();
		for (int i = 0; i < bs.size(); i++) {
			obj.put(bs.get(i).getBsCode(), bs.get(i).getBsLevel());
		}
		return obj;
	}

	// daily 혈압
	@Override
	public Map<String, Object> readDailyBP(int userSeq, String date) {
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());

		Map<String, Object> result = new HashMap<>();
		String yesterday = returnYesterday(date);

		result.put("today", calcBP(userSeq, date));
		result.put("yesterday", calcBP(userSeq, yesterday));

		return result;
	}

	public Map<String, Object> calcBP(int userSeq, String date) {
		List<BloodPressure> bp = bpRepository.findUserDailyBP(userSeq, date);
		Map<String, Object> obj = new HashMap<>();
		for (int i = 0; i < bp.size(); i++) {
			Map<String, Object> obj2 = new HashMap<>();
			obj2.put("BpHigh", bp.get(i).getBpHigh());
			obj2.put("BpLow", bp.get(i).getBpLow());
			obj.put(bp.get(i).getBpCode(), obj2);
		}

		return obj;
	}

	// daily 칼로리
	@Override
	public Map<String, Object> readDailyKcal(int userSeq, String date) {
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());

		Map<String, Object> result = new HashMap<>();
		String yesterday = returnYesterday(date);

		result.put("today", calcKcal(userSeq, date));
		result.put("yesterday", calcKcal(userSeq, yesterday));

		return result;
	}

	public double calcKcal(int userSeq, String date) {
		double kcalTotal = 0;

		List<Diet> diet = dietRepository.findDiet(userSeq, date);

		for (int i = 0; i < diet.size(); i++) {
			Diet target = diet.get(i);
			String fc = target.getFoodCode();
			int amount = target.getDietAmount();
			Food food = foodRepository.findFood(fc);
			kcalTotal += food.getFoodKcal() * amount / food.getFoodAmount();
		}
		return kcalTotal;
	}

	// 오늘 날짜 입력 -> 어제 날짜 출력
	private String returnYesterday(String today) {
		SimpleDateFormat dtFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		Date dt;
		try {
			dt = dtFormat.parse(today);
			cal.setTime(dt);
			cal.add(Calendar.DATE, -1);
			return dtFormat.format(cal.getTime());
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}
}
