package com.neulbomi.neulbom.service;

import com.neulbomi.neulbom.dto.EmailDto;

public interface MailService {
	// 회원가입 인증코드 생성
	public String generateKey();
	// 이메일 인증 메일 전송
	public void sendCertMail(EmailDto email);
	// 임시 비밀번호 메일 전송
//	public void sendPwdMail(EmailDto email);
}
