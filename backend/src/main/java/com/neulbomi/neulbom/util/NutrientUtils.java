package com.neulbomi.neulbom.util;

public class NutrientUtils {
	
	public static int getTotalKcal(String gender, double height) {
		height /= 100;
		
		if(gender.equals("m")) return (int)((height*height)*22*28);
		else return (int)((height*height)*21*28);
	}
}
