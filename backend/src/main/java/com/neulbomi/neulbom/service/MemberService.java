package com.neulbomi.neulbom.service;

import com.neulbomi.neulbom.dto.MemberDto;
import com.neulbomi.neulbom.dto.MemberModifyDto;

public interface MemberService {
	// 회원가입
	public void signIn(MemberDto memberDto);
	// 회원정보 수정
	public void modify(MemberModifyDto memberModifyDto);
	
}
