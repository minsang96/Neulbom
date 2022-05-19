package com.neulbomi.neulbom.exception;

public class NotJPGException extends RuntimeException {
	public NotJPGException() {
		super("jpg파일이 아닙니다.");
	}
}