package com.neulbomi.neulbom.service;

import java.util.Map;

public interface ReportService {

	public Map<String, Object> readDailyBS(int userSeq, String date);
	public Map<String, Object> readDailyBP(int userSeq, String date);
	public Map<String, Object> readDailyKcal(int userSeq, String date);
}
