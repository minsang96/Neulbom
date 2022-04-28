package com.neulbomi.neulbom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.repository.UserRepository;

@Service
public class CustomUserDetailService implements UserDetailsService {

	@Autowired
    private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
		 return userRepository.findByDelYnAndUserEmail("n",userEmail)
	                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
	}

    
}
