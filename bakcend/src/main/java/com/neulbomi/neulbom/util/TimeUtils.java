package com.neulbomi.neulbom.util;

import java.time.LocalDateTime;

public class TimeUtils {

	// 현재 시간 구하기
	public static String curTime() {
		return LocalDateTime.now().toString().replace("T", " ").substring(0, 19);
	}
	// 일주일 전 시간 구하기
	public static String before1WeekTime() {
		return LocalDateTime.now().minusDays(7).toString().replace("T", " ").substring(0, 19);
	}
}
