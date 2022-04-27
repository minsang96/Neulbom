package com.neulbomi.neulbom.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.dto.EmailDto;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class MailServiceImpl implements MailService {

	private final JavaMailSender mailSender;

	// 이메일 난수 만드는 메서드
	@Override
	public String generateKey() {
		Random random = new Random();
		StringBuffer sb = new StringBuffer();
		int num = 0;

		do {
			num = random.nextInt(75) + 48;
			if ((num >= 48 && num <= 57) || (num >= 65 && num <= 90) || (num >= 97 && num <= 122)) {
				sb.append((char) num);
			} else {
				continue;
			}

		} while (sb.length() < 8);
		return sb.toString();
	}

	@Async
	@Override
	public void sendCertMail(EmailDto email) {
		MimeMessagePreparator messagePreparator = mimeMessage -> {
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
			messageHelper.setFrom("neulbomi@nuelbom.com");
			messageHelper.setTo(email.getRecipient());
			messageHelper.setSubject(email.getSubject());
			messageHelper.setText(email.getBody(), true);
		};

		try {
			mailSender.send(messagePreparator);
			log.info("이메일 인증 링크를 보냈습니다.");
		} catch (MailException e) {
			log.error(String.valueOf(e));
			e.printStackTrace();
//            throw new CustomException("메일을 여기로 보내는 중 에러 발생 :  " + email.getRecipient());
		}
	}
	
//	@Async
//	@Override
//	public void sendPwdMail(EmailDto email) {
//		MimeMessagePreparator messagePreparator = mimeMessage -> {
//			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
//			messageHelper.setFrom("neulbomi@nuelbom.com");
//			messageHelper.setTo(email.getRecipient());
//			messageHelper.setSubject(email.getSubject());
//			messageHelper.setText(email.getBody(), true);
//		};
//
//		try {
//			mailSender.send(messagePreparator);
//			log.info("이메일 인증 링크를 보냈습니다.");
//		} catch (MailException e) {
//			log.error(String.valueOf(e));
//			e.printStackTrace();
////            throw new CustomException("메일을 여기로 보내는 중 에러 발생 :  " + email.getRecipient());
//		}
//	}

}
