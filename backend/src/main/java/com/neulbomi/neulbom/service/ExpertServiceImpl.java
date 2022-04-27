package com.neulbomi.neulbom.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.dto.ExpertJoinDto;
import com.neulbomi.neulbom.entity.Career;
import com.neulbomi.neulbom.entity.Expert;
import com.neulbomi.neulbom.entity.User;
import com.neulbomi.neulbom.exception.ExistsUserEmailException;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.repository.CareerRepository;
import com.neulbomi.neulbom.repository.ExpertRepository;
import com.neulbomi.neulbom.repository.UserRepository;
import com.neulbomi.neulbom.util.MailContentBuilder;
import com.neulbomi.neulbom.util.TimeUtils;

@Service
public class ExpertServiceImpl implements ExpertService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	ExpertRepository expertRepository;
	
	@Autowired
	CareerRepository careerRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	MailContentBuilder mailContentBuilder;
	
	@Autowired
	MailService mailService;

	@Override
	public void join(ExpertJoinDto expertJoinDto) {
		// 현재 시간
		String now = TimeUtils.curTime();
		
		if(userRepository.findByDelYnAndUserEmail("n", expertJoinDto.getEmail()).isPresent()) throw new ExistsUserEmailException();
		// 회원 테이블에 저장
		userRepository.save(User.builder()
				.userType(expertJoinDto.getType())
				.userEmail(expertJoinDto.getEmail())
				.userPwd(passwordEncoder.encode(expertJoinDto.getPwd()))      // 📍 비밀번호 암호화하기 
				.regDt(now)
				.regEmail(expertJoinDto.getEmail())
				.modDt(now)
				.modEmail(expertJoinDto.getEmail())
				.build());
		
		// userSeq 사용하기 위해서 가져오기
		User user = userRepository.findByDelYnAndUserEmail("n", expertJoinDto.getEmail()).orElseThrow(() -> new NotExistsUserException());
		
		// 전문가 테이블에 저장
		expertRepository.save(Expert.builder()
				.userSeq(user.getUserSeq())
				.expertName(expertJoinDto.getName())
				.expertImg(expertJoinDto.getImg())
				.expertDesc(expertJoinDto.getDesc())
				.enabledYn("n")
				.regDt(now)
				.regEmail(user.getUserEmail())
				.modDt(now)
				.modEmail(user.getUserEmail())
				.build());
		
		// 경력 저장
		for (String career : expertJoinDto.getCareer()) {
			careerRepository.save(Career.builder()
					.userSeq(user.getUserSeq())
					.careerContent(career)
					.regDt(now)
					.regEmail(user.getUserEmail())
					.modDt(now)
					.modEmail(user.getUserEmail())
					.build());
		}
		
	}

	@Override
	public Expert getUserByEmail(int userSeq) {
		Optional<Expert> expert = expertRepository.findByDelYnAndUserSeq("n", userSeq);
		if(!expert.isPresent()) return null;
		return expert.get();
	}

}