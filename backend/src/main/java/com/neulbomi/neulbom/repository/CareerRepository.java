package com.neulbomi.neulbom.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neulbomi.neulbom.entity.Career;

@Repository
public interface CareerRepository extends JpaRepository<Career, Long> {
	// UserSeq로 찾기
	public ArrayList<Career> findByDelYnAndUserSeq(String delYn, int userSeq);
}
