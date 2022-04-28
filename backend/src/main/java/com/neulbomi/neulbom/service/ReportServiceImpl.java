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
		Map<String, Object> obj = null;
		
		List<BloodSugar> today = bsRepository.findUserDailyBS(userSeq, date);
		obj = new HashMap<>();
		for(int i = 0; i < today.size(); i++) {
			obj.put(today.get(i).getBsTime(), today.get(i).getBsLevel());		
		}
		result.put("today", obj);
		
		String yesterday_ = returnYesterday(date);
		List<BloodSugar> yesterday = bsRepository.findUserDailyBS(userSeq, yesterday_);
		obj = new HashMap<>();
		for(int i = 0; i < yesterday.size(); i++) {
			obj.put(yesterday.get(i).getBsTime(), yesterday.get(i).getBsLevel());		
		}
		result.put("yesterday", obj);
		
		return result;
	}


	// daily 혈압
	@Override
	public Map<String, Object> readDailyBP(int userSeq, String date) {
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());
		
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> obj = null;
		
		List<BloodPressure> today = bpRepository.findUserDailyBP(userSeq, date);
		obj = new HashMap<>();
		for(int i = 0; i < today.size(); i++) {
			Map<String, Object> obj2 = new HashMap<>();
			obj2.put("BpHigh", today.get(i).getBpHigh());		
			obj2.put("BpLow", today.get(i).getBpLow());
			obj.put(today.get(i).getBpTime(), obj2);
		}
		result.put("today", obj);
		
		String yesterday_ = returnYesterday(date);
		List<BloodPressure> yesterday = bpRepository.findUserDailyBP(userSeq, yesterday_);
		obj = new HashMap<>();
		for(int i = 0; i < yesterday.size(); i++) {
			Map<String, Object> obj2 = new HashMap<>();
			obj2.put("BpHigh", yesterday.get(i).getBpHigh());		
			obj2.put("BpLow", yesterday.get(i).getBpLow());
			obj.put(yesterday.get(i).getBpTime(), obj2);	
		}
		result.put("yesterday", obj);
		
		return result;
	}

	// daily 칼로리
	@Override
	public Map<String, Object> readDailyKcal(int userSeq, String date) {
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());
		
		Map<String, Object> result = new HashMap<>();
		result.put("today", calKcal(userSeq, date));

		String yesterday = returnYesterday(date);
		result.put("yesterday", calKcal(userSeq, yesterday));

		return result;
	}
	
	public double calKcal(int userSeq, String date) {
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
