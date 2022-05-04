package com.neulbomi.neulbom.service;

import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.entity.BloodPressure;
import com.neulbomi.neulbom.entity.BloodSugar;
import com.neulbomi.neulbom.entity.Member;
import com.neulbomi.neulbom.entity.Other;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.repository.BloodPressureRepository;
import com.neulbomi.neulbom.repository.BloodSugarRepository;
import com.neulbomi.neulbom.repository.MemberRepository;
import com.neulbomi.neulbom.repository.OtherRepository;

@Service
public class CalendarServiceImpl implements CalendarService {

	@Autowired
	MemberRepository memberRepository;
	
	@Autowired
	BloodSugarRepository bloodSugarRepository;
	
	@Autowired
	BloodPressureRepository bloodPressureRepository;
	
	@Autowired
	OtherRepository otherRepository;
	
	@SuppressWarnings("unchecked")
	@Override
	public HashMap<String, JSONObject> getCalendarMonthRecord(int userSeq, String date) {
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());
		
		// date : 2022-05
		
		// 1. 혈당 기록 불러오기
		List<BloodSugar> list = bloodSugarRepository.findByDelYnAndUserSeqAndBsDateStartsWith("n", userSeq, date);
		HashMap<String, JSONObject> result = new HashMap<String, JSONObject>();
		for (BloodSugar bloodSugar : list) {
			if(result.get(bloodSugar.getBsDate()) == null) {
				result.put(bloodSugar.getBsDate(), new JSONObject());
				JSONObject record = result.get(bloodSugar.getBsDate());
				record.put("bloodSugar", new JSONArray());
				record.put("bloodPressure", new JSONArray());
				record.put("exercise", new JSONArray());
				record.put("coffee", new JSONArray());
				record.put("alcohol", new JSONArray());
			}
			
			JSONObject record = result.get(bloodSugar.getBsDate());
			
			JSONArray bloodSugarList = (JSONArray) record.get("bloodSugar");
			if(record.get("bloodSugar") == null) bloodSugarList = new JSONArray();
			
			JSONObject obj = new JSONObject();
			obj.put("bsCode", bloodSugar.getBsCode());
			obj.put("bsLevel", bloodSugar.getBsLevel());
			obj.put("bsTime", bloodSugar.getBsTime());
			
			bloodSugarList.add(obj);
			record.put("bloodSugar", bloodSugarList);
		}
		
		// 2. 혈압 기록 불러오기
		List<BloodPressure> bloodPressures = bloodPressureRepository.findByDelYnAndUserSeqAndBpDateStartsWith("n", userSeq, date);
		for (BloodPressure bloodPressure : bloodPressures) {
			if(result.get(bloodPressure.getBpDate()) == null) {
				result.put(bloodPressure.getBpDate(), new JSONObject());
				JSONObject record = result.get(bloodPressure.getBpDate());
				record.put("bloodSugar", new JSONArray());
				record.put("bloodPressure", new JSONArray());
				record.put("exercise", new JSONArray());
				record.put("coffee", new JSONArray());
				record.put("alcohol", new JSONArray());
			}
			
			JSONObject record = result.get(bloodPressure.getBpDate());
			
			JSONArray bloodPressureList = (JSONArray) record.get("bloodPressure");
			if(record.get("bloodPressure") == null) bloodPressureList = new JSONArray();
			
			JSONObject obj = new JSONObject();
			obj.put("bpCode", bloodPressure.getBpCode());
			obj.put("bpHigh", bloodPressure.getBpHigh());
			obj.put("bpLow", bloodPressure.getBpLow());
			obj.put("bpTime", bloodPressure.getBpTime());
			
			bloodPressureList.add(obj);
			record.put("bloodPressure", bloodPressureList);
		}
		
		// 3. 다른 기록 불러오기
		List<Other> alcohols = otherRepository.findByDelYnAndUserSeqAndOtherDateStartsWith("n", userSeq, date);
		for (Other other : alcohols) {
			if(result.get(other.getOtherDate()) == null) {
				result.put(other.getOtherDate(), new JSONObject());
				JSONObject record = result.get(other.getOtherDate());
				record.put("bloodSugar", new JSONArray());
				record.put("bloodPressure", new JSONArray());
				record.put("exercise", new JSONArray());
				record.put("coffee", new JSONArray());
				record.put("alcohol", new JSONArray());
			}
			
			JSONObject record = result.get(other.getOtherDate());
			
			JSONArray otherList = (JSONArray) record.get(other.getCode());
			if(record.get(other.getCode()) == null) otherList = new JSONArray();
			
			JSONObject obj = new JSONObject();
			obj.put("code", other.getCode());
			obj.put("otherTime", other.getOtherTime());
			
			otherList.add(obj);
			record.put(other.getCode(), otherList);
		}
		
		
		return result;
	}

}
