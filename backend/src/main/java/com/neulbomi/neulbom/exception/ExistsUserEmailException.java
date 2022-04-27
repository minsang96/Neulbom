package com.neulbomi.neulbom.exception;

public class ExistsUserEmailException extends RuntimeException {
	public ExistsUserEmailException() {
		super("이미 가입된 이메일입니다.");
	}
}