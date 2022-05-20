package com.neulbomi.neulbom.exception;

public class FailAnalyzeFoodException extends RuntimeException {
	public FailAnalyzeFoodException() {
		super("음식 인식에 실패했습니다.");
	}
}