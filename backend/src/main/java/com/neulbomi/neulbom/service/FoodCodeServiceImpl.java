package com.neulbomi.neulbom.service;

import java.io.FileReader;
import java.io.IOException;
import java.util.Iterator;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.repository.FoodRepository;

@Service
public class FoodCodeServiceImpl implements FoodCodeService {
	
	@Autowired
	FoodRepository foodRepository;

	@Override
	public void inputFoodCode() {
		try {
			Object ob = new JSONParser().parse(new FileReader("C:\\Users\\SSAFY\\Downloads\\test.json"));
			JSONObject js = (JSONObject) ob;
			
			Iterator iter = js.keySet().iterator();
			
			while(iter.hasNext()) {
				String key = (String)iter.next();
				System.out.println(key);
				String value = (String) js.get(key);
				System.out.println(key + ", " + value);
				foodRepository.updateFoodCode(value, key);
			}

		} catch (IOException | ParseException e) {
			e.printStackTrace();
		}
	}

}
