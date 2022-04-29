package com.neulbomi.neulbom.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONObject;

import com.neulbomi.neulbom.dto.DietDto;

public interface DietService {

	// 식단 등록
	public void recordDiet(ArrayList<DietDto> dietDto);

	// 식단 삭제
	public void removeDiet(long[] dietSeqs);

	// 해당 일자의 식단 조회
	public HashMap<String, Object> dietDaily(int userSeq, String dietDate);

	// 음식 검색하기
	public List<JSONObject> searchFood(String keyword, int page, int size);

}
