package com.neulbomi.neulbom.service;

import java.util.Random;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.dto.EmailDto;
import com.neulbomi.neulbom.exception.NotExistsImgException;

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
			log.info("이메일 인증 번호 메일을 보냈습니다.");
		} catch (MailException e) {
			log.error(String.valueOf(e));
			e.printStackTrace();
		}
	}

	// 전문가 자격 인증 요청 메일 전송
	@Async
	@Override
	public void sendExpertCertMail(EmailDto email) {
		if (email.getCertImg() == null) throw new NotExistsImgException();
		
		MimeMessagePreparator messagePreparator = mimeMessage -> {
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
			messageHelper.setFrom("neulbomi@nuelbom.com");
			messageHelper.setTo("freessafy104@gmail.com"); // 관리자 계정에 보내기
			messageHelper.setSubject(email.getSubject());
			messageHelper.setText(email.getBody(), true);
			messageHelper.addAttachment(email.getCertImg().getOriginalFilename(), email.getCertImg());
		};
		
		try {
			mailSender.send(messagePreparator);
			log.info("전문가 자격 요청 메일을 보냈습니다.");
		} catch (MailException e) {
			log.error(String.valueOf(e));
			e.printStackTrace();
		}
	}

}
