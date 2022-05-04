package com.neulbomi.neulbom.service;

import com.neulbomi.neulbom.dto.OtherDto;

public interface OtherService {
	// 술,커피,운동 등록
	public void addRecord(OtherDto otherDto);
	// 술,커피,운동 기록 삭제
	public void deleteRecord(int otherSeq);
	
}
