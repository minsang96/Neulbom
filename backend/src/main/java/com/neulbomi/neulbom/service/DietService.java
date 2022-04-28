package com.neulbomi.neulbom.service;

import java.util.HashMap;

import org.springframework.web.multipart.MultipartFile;

import com.neulbomi.neulbom.dto.DietDto;

public interface DietService {

	// 식단 등록
	public void recordDiet(DietDto dietDto, MultipartFile dietImg);

	// 해당 일자의 식단 조회
	public HashMap<String, Object> dietDaily(int userSeq, String dietDate);
}
