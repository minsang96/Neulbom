package com.neulbomi.neulbom.service;

import java.util.LinkedList;
import java.util.Map;

import com.neulbomi.neulbom.dto.ExpertJoinDto;
import com.neulbomi.neulbom.entity.Expert;

public interface ConsultingService {

	// 전문가 목록 조회
	public LinkedList<Object> getInfo();
}
