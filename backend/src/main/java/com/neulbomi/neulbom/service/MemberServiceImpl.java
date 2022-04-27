package com.neulbomi.neulbom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.dto.MemberSingInDto;
import com.neulbomi.neulbom.entity.Member;
import com.neulbomi.neulbom.entity.User;
import com.neulbomi.neulbom.exception.ExistsUserEmailException;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.repository.MemberRepository;
import com.neulbomi.neulbom.repository.UserRepository;
import com.neulbomi.neulbom.util.NutrientUtils;
import com.neulbomi.neulbom.util.TimeUtils;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired 
	private UserRepository userRepository;
	
	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public void signIn(MemberSingInDto memberSignInDto) {
		if(userRepository.findByDelYnAndUserEmail("n", memberSignInDto.getUserEmail()).isPresent()) throw new ExistsUserEmailException();
		userRepository.save(User.builder()
				.userType(memberSignInDto.getUserType())
				.userEmail(memberSignInDto.getUserEmail())
				.userPwd(passwordEncoder.encode(memberSignInDto.getUserPwd()))
				.regEmail(memberSignInDto.getUserEmail())
				.regDt(TimeUtils.curTime())
				.modEmail(memberSignInDto.getUserEmail())
				.modDt(TimeUtils.curTime()).build());
		
		User user = userRepository.findByDelYnAndUserEmail("n", memberSignInDto.getUserEmail()).orElseThrow(()-> new NotExistsUserException());

		memberRepository.save(Member.builder()
				.userSeq(user.getUserSeq())
				.memberNickname(memberSignInDto.getMemberNickname())
				.memberImg(memberSignInDto.getMemberImg())
				.memberHeight(memberSignInDto.getMemberHeight())
				.memberWeight(memberSignInDto.getMemberWeight())
				.memberYear(memberSignInDto.getMemberYear())
				.memberGender(memberSignInDto.getMemberGender())
				.memberDesc(memberSignInDto.getMemberDesc())
				.memberKcal(NutrientUtils.getTotalKcal(memberSignInDto.getMemberGender(), (double)memberSignInDto.getMemberHeight()/100))
				.regEmail(memberSignInDto.getUserEmail())
				.regDt(TimeUtils.curTime())
				.modEmail(memberSignInDto.getUserEmail())
				.modDt(TimeUtils.curTime()).build());
		
	}

}
