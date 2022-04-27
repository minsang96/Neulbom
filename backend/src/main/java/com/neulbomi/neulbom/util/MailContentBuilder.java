package com.neulbomi.neulbom.util;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MailContentBuilder {

	private final TemplateEngine templateEngine;

	public String certBuild(String certKey) {
		Context context = new Context();
		context.setVariable("certKey", certKey);
		return templateEngine.process("mailTemplate", context);
	}

	// 전문가 자격 인증 메일
	public String expertCertBuild(String expertName, String expertEmail) {
		Context context = new Context();
		context.setVariable("expertName", expertName);
		context.setVariable("expertEmail", expertEmail);
		return templateEngine.process("mailTemplateExpertCert", context);
	}
}
