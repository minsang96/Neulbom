package com.neulbomi.neulbom.service;

import java.util.Map;

import com.neulbomi.neulbom.dto.MemberDto;
import com.neulbomi.neulbom.dto.MemberModifyDto;

public interface MemberService {
	// 회원가입
	public void signIn(MemberDto memberDto);
	// 회원정보 수정
	public void modify(MemberModifyDto memberModifyDto);
	// 회원정보 조회
	public Map<String,Object> getInfo(int userSeq);
	// 혈압,혈당 선택여부 조회
	public Map<String,Object> getBloodInfo(int userSeq);
	// 채팅창에 보여질 회원 기본 정보 조회
	public Map<String,Object> getChatInfo(int userSeq);
}
