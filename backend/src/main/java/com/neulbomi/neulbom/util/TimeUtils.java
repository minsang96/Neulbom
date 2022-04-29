package com.neulbomi.neulbom.util;

import java.time.LocalDateTime;

public class TimeUtils {

	// 현재 시간 구하기 YYYY-MM-DD HH:MM:SS
	public static String curTime() {
		return LocalDateTime.now().toString().replace("T", " ").substring(0, 19);
	}
	// 현재 시간 날짜만 구하기 YYYY-MM-DD
	public static String curOnlyDate() {
		return LocalDateTime.now().toString().replace("T", " ").substring(0, 10);
	} 
	// 현재 시간만 구하기 HH:MM
	public static String curOnlyTime() {
		return LocalDateTime.now().toString().replace("T", " ").substring(11, 16);
	}
	// 일주일 전 시간 구하기
	public static String before1WeekTime() {
		return LocalDateTime.now().minusDays(7).toString().replace("T", " ").substring(0, 19);
	}
}
