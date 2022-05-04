package com.neulbomi.neulbom.exception;

public class NotExistsRecordException extends RuntimeException {
	public NotExistsRecordException() {
		super("존재하지 않는 술,커피,운동 기록 시퀀스 입니다.");
	}
}