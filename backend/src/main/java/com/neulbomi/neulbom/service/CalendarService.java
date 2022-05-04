package com.neulbomi.neulbom.service;

import java.util.HashMap;

import org.json.simple.JSONObject;

public interface CalendarService {
	public HashMap<String, JSONObject> getCalendarMonthRecord(int userSeq, String date);
	
	/**
	 * {
	 * 날짜 : 2022-05-04
	 * 	recordList : {
	 * 			혈당 : {
	 *  			{시간, 수치, 아침 전후/점심 전후/저녁 전후 },
	 *  
	 *  		},
	 *			혈압 : {
	 *				시간, 최고, 최저, 아침/점심/저녁
	 *			}, 	
	 *			술 : {
	 *				시간
	 * 			},
	 *			커피: {
	 *				시간
	 * 			},
	 *			운동: {
	 *				시간
	 * 			},
	 * 	}
	 * }
	 * 
	 * */
}
