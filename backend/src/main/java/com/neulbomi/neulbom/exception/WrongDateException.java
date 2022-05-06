package com.neulbomi.neulbom.exception;

public class WrongDateException extends RuntimeException{
	public WrongDateException() {
		super("잘못된 날짜 양식입니다.");
	}
}
