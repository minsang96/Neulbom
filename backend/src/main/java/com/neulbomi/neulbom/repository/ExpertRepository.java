package com.neulbomi.neulbom.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neulbomi.neulbom.entity.Expert;

@Repository
public interface ExpertRepository extends JpaRepository<Expert, Integer> {
	// UserSeq로 찾기
	public Optional<Expert> findByDelYnAndUserSeq(String delYn, int userSeq);

}
