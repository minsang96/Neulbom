package com.neulbomi.neulbom.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neulbomi.neulbom.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	public Optional<User> findByDelYnAndUserEmail(String delYn, String userEmail);
}
