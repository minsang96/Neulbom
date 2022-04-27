package com.neulbomi.neulbom.util;

public class NutrientUtils {
	
	public static int getTotalKcal(String gender, double height) {
		height /= 100; // 미터 단위로 환산
		
		if(gender.equals("m")) return (int)((height*height)*22*28);	// 남성일경우
		else return (int)((height*height)*21*28);	// 여성일경우
	}
}
