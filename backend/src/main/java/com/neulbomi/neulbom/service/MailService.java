package com.neulbomi.neulbom.service;

import com.neulbomi.neulbom.dto.EmailDto;

public interface MailService {
	// 회원가입 인증코드 생성
	public String generateKey();
	// 이메일 인증 메일 전송
	public void sendCertMail(EmailDto email);
	// 전문가 자격 인증(자격증 사진) 메일 전송
	public void sendExpertCertMail(EmailDto email);
}
