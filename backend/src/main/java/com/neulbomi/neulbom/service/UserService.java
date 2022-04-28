package com.neulbomi.neulbom.service;

import com.neulbomi.neulbom.entity.User;

public interface UserService {
	// 이메일로 user 찾기
	public User getUserByEmail(String userEmail);
}
