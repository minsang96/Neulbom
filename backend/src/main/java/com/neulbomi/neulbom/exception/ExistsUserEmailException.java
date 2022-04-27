package com.neulbomi.neulbom.exception;

public class ExistsUserEmailException extends RuntimeException {
	public ExistsUserEmailException() {
		super("이미 해당 이메일로 가입된 계정이 있습니다.");
	}
}