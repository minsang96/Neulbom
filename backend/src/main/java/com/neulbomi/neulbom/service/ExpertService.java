package com.neulbomi.neulbom.service;

import com.neulbomi.neulbom.dto.ExpertJoinDto;
import com.neulbomi.neulbom.entity.Expert;

public interface ExpertService {

	// 회원가입
	public void join(ExpertJoinDto expertJoinDto);

	// userSeq로 전문가 찾기
	public Expert getUserByEmail(int userSeq);
}
