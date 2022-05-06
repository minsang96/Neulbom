package com.neulbomi.neulbom.exception;

public class WrongTimeException extends RuntimeException{
	public WrongTimeException() {
		super("잘못된 시간 양식입니다.");
	}
}
