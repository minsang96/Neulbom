package com.neulbomi.neulbom.exception;

public class FileUploadFailedException extends RuntimeException {
	public FileUploadFailedException() {
		super("파일 업로드에 실패했습니다.");
	}
}