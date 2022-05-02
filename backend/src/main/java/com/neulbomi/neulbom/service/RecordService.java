package com.neulbomi.neulbom.service;

import java.util.List;
import java.util.Map;

import com.neulbomi.neulbom.dto.BloodPressureDto;
import com.neulbomi.neulbom.dto.BloodSugarDto;

public interface RecordService {
	// 날짜 별 혈당 기록 조회
	public List<Map<String, Object>> getBsByDate(int userSeq, String bsDate);
	// 혈당 기록 추가
	public void addBs(BloodSugarDto bloodSugarDto);
	// 날짜 별 혈압 기록 조회
	public List<Map<String, Object>> getBpByDate(int userSeq, String bpDate);
	// 혈압 기록 추가
	public void addBp(BloodPressureDto bloodPressureDto);
	
}
