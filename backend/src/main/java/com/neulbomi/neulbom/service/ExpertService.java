package com.neulbomi.neulbom.service;

import java.util.Map;

import com.neulbomi.neulbom.dto.ExpertJoinDto;
import com.neulbomi.neulbom.entity.Expert;

public interface ExpertService {

	// 회원가입
	public void join(ExpertJoinDto expertJoinDto);

	// userSeq로 전문가 찾기
	public Expert getExpertByUserSeq(int userSeq);
	
	// 전문가 상세 정보 조회
	public Map<String, Object> getExpertInfoDetail(int userSeq);

	// 전문가 기본 정보 조회
	public Map<String, Object> getExpertInfoDefault(int userSeq);
}
