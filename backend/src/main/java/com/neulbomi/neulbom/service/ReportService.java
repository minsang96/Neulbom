package com.neulbomi.neulbom.service;

import java.util.Map;

public interface ReportService {

	public Map<String, Object> readDailyBS(int userSeq, String date);
	public Map<String, Object> readDailyBP(int userSeq, String date);
	public Map<String, Object> readDailyKcal(int userSeq, String date);
	public Map<String, Object> readDailyNutrient(int userSeq, String date);
	
	public Map<String, Object> readWeeklyBS(int userSeq, String date);
	public Map<String, Object> readWeeklyBP(int userSeq, String date);
	public Map<String, Object> readWeeklyKcal(int userSeq, String date);
	public Map<String, Object> readWeeklyNutrient(int userSeq, String date);
}
