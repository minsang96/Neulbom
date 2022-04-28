package com.neulbomi.neulbom.exception;

public class EmptyFileException extends RuntimeException {
	public EmptyFileException() {
		super("유요하지 않은 파일입니다.");
	}
}