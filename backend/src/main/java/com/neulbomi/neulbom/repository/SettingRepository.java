package com.neulbomi.neulbom.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neulbomi.neulbom.entity.Setting;

@Repository
public interface SettingRepository extends JpaRepository<Setting, Long> {
	// 유저 시퀀스와 코드로 설정 값 찾기
	public Optional<Setting> findByDelYnAndUserSeqAndCode(String delYn, int userSeq, String code);
	// 유저 시퀀스로 설정 값 찾기
	public Optional<List<Setting>> findByDelYnAndUserSeq(String delYn, int userSeq);
}
