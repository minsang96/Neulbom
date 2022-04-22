package com.neulbomi.neulbom.exception;

public class NotExistsUserException extends RuntimeException {
	public NotExistsUserException() {
		super("존재하지 않는 사용자 입니다.");
	}
}