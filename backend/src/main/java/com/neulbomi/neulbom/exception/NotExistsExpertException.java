package com.neulbomi.neulbom.exception;

public class NotExistsExpertException extends RuntimeException {
	public NotExistsExpertException() {
		super("존재하지 않는 전문가 입니다.");
	}
}