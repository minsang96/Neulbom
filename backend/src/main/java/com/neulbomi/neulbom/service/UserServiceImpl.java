package com.neulbomi.neulbom.service;

import java.util.Optional;

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
		Optional<User> user = userRepository.findByDelYnAndUserEmail("n", userEmail);
		if(!user.isPresent()) return null;
		return user.get();
	}

	@Override
	public User getUserByUserSeq(int userSeq) {
		Optional<User> user = userRepository.findByDelYnAndUserSeq("n", userSeq);
		if(!user.isPresent()) return null;
		return user.get();
	}

}
