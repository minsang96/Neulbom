package com.neulbomi.neulbom.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.regex.Pattern;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.entity.BloodPressure;
import com.neulbomi.neulbom.entity.BloodSugar;
import com.neulbomi.neulbom.entity.Member;
import com.neulbomi.neulbom.entity.Other;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.exception.WrongDateException;
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
		
		if(!Pattern.matches("^(19|20)\\d{2}-(0[1-9]|1[012])$", date)) throw new WrongDateException();
		
		// date : 2022-05
		
		// 1. 혈당 기록 불러오기
		List<BloodSugar> list = bloodSugarRepository.findByDelYnAndUserSeqAndBsDateStartsWith("n", userSeq, date);
		HashMap<String, JSONObject> result = new HashMap<String, JSONObject>();
		for (BloodSugar bloodSugar : list) {
			if(result.get(bloodSugar.getBsDate()) == null) {
				result.put(bloodSugar.getBsDate(), new JSONObject());
			}
			
			JSONObject record = result.get(bloodSugar.getBsDate());
			
			JSONArray bloodSugarList = (JSONArray) record.get("bloodSugar");
			if(record.get("bloodSugar") == null) bloodSugarList = new JSONArray();
			
			JSONObject obj = new JSONObject();
			obj.put("bsSeq", bloodSugar.getBsSeq());
			obj.put("bsCode", bloodSugar.getBsCode());
			obj.put("bsLevel", bloodSugar.getBsLevel());
			obj.put("bsTime", bloodSugar.getBsTime());
			
			HashSet<String> otherSet = (HashSet<String>) record.get("dots");
			if(otherSet == null) otherSet = new HashSet<String>();
			otherSet.add("bloodSugar");
			
			bloodSugarList.add(obj);
			record.put("bloodSugar", bloodSugarList);
			record.put("dots", otherSet);
		}
		
		// 2. 혈압 기록 불러오기
		List<BloodPressure> bloodPressures = bloodPressureRepository.findByDelYnAndUserSeqAndBpDateStartsWith("n", userSeq, date);
		for (BloodPressure bloodPressure : bloodPressures) {
			if(result.get(bloodPressure.getBpDate()) == null) {
				result.put(bloodPressure.getBpDate(), new JSONObject());
			}
			
			JSONObject record = result.get(bloodPressure.getBpDate());
			
			JSONArray bloodPressureList = (JSONArray) record.get("bloodPressure");
			if(record.get("bloodPressure") == null) bloodPressureList = new JSONArray();
			
			JSONObject obj = new JSONObject();
			obj.put("bpSeq", bloodPressure.getBpSeq());
			obj.put("bpCode", bloodPressure.getBpCode());
			obj.put("bpHigh", bloodPressure.getBpHigh());
			obj.put("bpLow", bloodPressure.getBpLow());
			obj.put("bpTime", bloodPressure.getBpTime());
			
			HashSet<String> otherSet = (HashSet<String>) record.get("dots");
			if(otherSet == null) otherSet = new HashSet<String>();
			otherSet.add("bloodPressure");
			
			bloodPressureList.add(obj);
			record.put("bloodPressure", bloodPressureList);
			record.put("dots", otherSet);
		}
		
		// 3. 다른 기록 불러오기
		List<Other> alcohols = otherRepository.findByDelYnAndUserSeqAndOtherDateStartsWith("n", userSeq, date);
		for (Other other : alcohols) {
			if(result.get(other.getOtherDate()) == null) {
				result.put(other.getOtherDate(), new JSONObject());
			}
			
			JSONObject record = result.get(other.getOtherDate());
			
			JSONArray otherList = (JSONArray) record.get(other.getCode());
			if(record.get(other.getCode()) == null) otherList = new JSONArray();
			
			JSONObject obj = new JSONObject();
			obj.put("otherSeq", other.getOtherSeq());
			obj.put("code", other.getCode());
			obj.put("otherTime", other.getOtherTime());
			
			HashSet<String> otherSet = (HashSet<String>) record.get("dots");
			if(otherSet == null) otherSet = new HashSet<String>();
			otherSet.add(other.getCode());
			
			otherList.add(obj);
			record.put(other.getCode(), otherList);
			record.put("dots", otherSet);
		}
		
		return result;
	}

}
