package com.neulbomi.neulbom.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

public class DateUtils {

	// mode = 2 -> 월요일, 일요일 날짜 리턴
	// mode = 7 -> 월요일 ~ 일요일 전체 날짜 리턴
	public static List<String> getDaysOfWeek(String dateStr, int mode) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		List<String> arrYMD = new LinkedList<>();
		try {
			Date date = df.parse(dateStr);
			Calendar cal = Calendar.getInstance();
			cal.setTime(date);

			int inYear = cal.get(cal.YEAR);
			int inMonth = cal.get(cal.MONTH);
			int inDay = cal.get(cal.DAY_OF_MONTH);
			int inDate = cal.get(cal.DAY_OF_WEEK);

			if (inDate != 1) // 해당요일이 일요일이 아닌경우
				inDate = inDate - 2;
			else // 해당요일이 일요일인경우
				inDate = 7;

			inDay = inDay - inDate;

			if (mode == 2)
				return date(inYear, inMonth, inDay, inDate, 2, cal);
			else
				return date(inYear, inMonth, inDay, inDate, 7, cal);

		} catch (ParseException e) {
		}
		return arrYMD;
	}

	public static List<String> date(int inYear, int inMonth, int inDay, int inDate, int mode, Calendar cal) {
		int loop[];
		List<String> result = new LinkedList<>();

		if (mode == 2)
			loop = new int[] { 0, 6 };
		else
			loop = new int[] { 0, 1, 2, 3, 4, 5, 6 };

		for (int i = 0; i < mode; i++) {
			cal.set(inYear, inMonth, inDay + loop[i]);
			String y = Integer.toString(cal.get(cal.YEAR));
			String m = Integer.toString(cal.get(cal.MONTH) + 1);
			String d = Integer.toString(cal.get(cal.DAY_OF_MONTH));
			if (m.length() == 1)
				m = "0" + m;
			if (d.length() == 1)
				d = "0" + d;

			result.add(y + "-" + m + "-" + d);
		}

		return result;

	}

	// 오늘 날짜 입력 -> 어제 날짜 출력(days : -1) or 지난주 날짜 출력(days : -7)
	public static String returnLastDate(String today, int days) {
		SimpleDateFormat dtFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		Date dt;
		try {
			dt = dtFormat.parse(today);
			cal.setTime(dt);
			cal.add(Calendar.DATE, days);
			return dtFormat.format(cal.getTime());
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 특정 날짜에 대하여 요일을 구함(일 ~ 토)
	 * 
	 * @param date
	 * @param dateType
	 * @return
	 * @throws Exception
	 */
	public static String getDateDay(String date, String dateType) throws Exception {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date nDate = dateFormat.parse(date);
		
		Calendar cal = Calendar.getInstance();
		cal.setTime(nDate);
		
		int dayNum = cal.get(Calendar.DAY_OF_WEEK);

		String day = "";
		switch (dayNum) {
		case 1:
			day = "sunday";
			break;
		case 2:
			day = "monday";
			break;
		case 3:
			day = "tuesday";
			break;
		case 4:
			day = "wednesday";
			break;
		case 5:
			day = "thursday";
			break;
		case 6:
			day = "friday";
			break;
		case 7:
			day = "saturday";
			break;
		}

		return day;
	}

}
