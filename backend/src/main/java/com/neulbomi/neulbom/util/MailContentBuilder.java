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

	public String passBuild(String pwd) {
		Context context = new Context();
		context.setVariable("pwd", pwd);
		return templateEngine.process("mailTemplatePwd", context);
	}
}
