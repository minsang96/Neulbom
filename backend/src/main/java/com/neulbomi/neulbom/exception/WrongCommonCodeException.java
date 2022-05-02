package com.neulbomi.neulbom.exception;

public class WrongCommonCodeException extends RuntimeException{
	public WrongCommonCodeException() {
		super("잘못된 공통코드입니다.");
	}
}
