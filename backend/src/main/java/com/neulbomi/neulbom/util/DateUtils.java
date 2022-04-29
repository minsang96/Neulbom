package com.neulbomi.neulbom.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

// mode = 2 -> 월요일, 일요일 날짜 리턴
// mode = 7 -> 월요일 ~ 일요일 전체 날짜 리턴
public class DateUtils {
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
}
