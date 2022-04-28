package com.neulbomi.neulbom.service;

import org.springframework.web.multipart.MultipartFile;

import com.neulbomi.neulbom.dto.DietDto;

public interface DietService {

	// 식단 등록
	public void recordDiet(DietDto dietDto, MultipartFile dietImg);
}
