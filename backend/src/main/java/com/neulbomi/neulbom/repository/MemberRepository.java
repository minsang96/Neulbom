package com.neulbomi.neulbom.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neulbomi.neulbom.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
	// 유저 시퀀스로 일반회원 찾기
	public Optional<Member> findByDelYnAndUserSeq(String delYn, int userSeq);
}
