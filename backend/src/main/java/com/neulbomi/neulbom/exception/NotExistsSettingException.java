package com.neulbomi.neulbom.exception;

public class NotExistsSettingException extends RuntimeException {
	public NotExistsSettingException() {
		super("설정 인자값이 잘못되었습니다.");
	}
}