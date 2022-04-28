package com.neulbomi.neulbom.exception;

public class NotExistsImgException extends RuntimeException {
	public NotExistsImgException() {
		super("전송된 사진 파일이 없습니다.");
	}
}