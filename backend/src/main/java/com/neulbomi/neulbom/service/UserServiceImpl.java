package com.neulbomi.neulbom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.entity.User;
import com.neulbomi.neulbom.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepository;

	@Override
	public User getUserByEmail(String userEmail) {
		User user = userRepository.findByUserEmail(userEmail);
		return user;
	}

}
