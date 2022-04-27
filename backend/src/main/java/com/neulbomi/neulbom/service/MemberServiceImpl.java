package com.neulbomi.neulbom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.dto.MemberDto;
import com.neulbomi.neulbom.entity.Member;
import com.neulbomi.neulbom.entity.Setting;
import com.neulbomi.neulbom.entity.User;
import com.neulbomi.neulbom.exception.ExistsUserEmailException;
import com.neulbomi.neulbom.exception.NotExistsSettingException;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.repository.MemberRepository;
import com.neulbomi.neulbom.repository.SettingRepository;
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
	private SettingRepository settingRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public void signIn(MemberDto memberDto) {
		if(userRepository.findByDelYnAndUserEmail("n", memberDto.getUserEmail()).isPresent()) throw new ExistsUserEmailException();
		userRepository.save(User.builder()
				.userType(memberDto.getUserType())
				.userEmail(memberDto.getUserEmail())
				.userPwd(passwordEncoder.encode(memberDto.getUserPwd()))
				.regEmail(memberDto.getUserEmail())
				.regDt(TimeUtils.curTime())
				.modEmail(memberDto.getUserEmail())
				.modDt(TimeUtils.curTime()).build());
		
		User user = userRepository.findByDelYnAndUserEmail("n", memberDto.getUserEmail()).orElseThrow(()-> new NotExistsUserException());

		memberRepository.save(Member.builder()
				.userSeq(user.getUserSeq())
				.memberNickname(memberDto.getMemberNickname())
				.memberImg(memberDto.getMemberImg())
				.memberHeight(memberDto.getMemberHeight())
				.memberWeight(memberDto.getMemberWeight())
				.memberYear(memberDto.getMemberYear())
				.memberGender(memberDto.getMemberGender())
				.memberDesc(memberDto.getMemberDesc())
				.memberKcal(NutrientUtils.getTotalKcal(memberDto.getMemberGender(), (double)memberDto.getMemberHeight()/100))
				.regEmail(memberDto.getUserEmail())
				.regDt(TimeUtils.curTime())
				.modEmail(memberDto.getUserEmail())
				.modDt(TimeUtils.curTime()).build());
		
		for(String code : memberDto.getSetting()) {
			if(!code.equals("bloodPresuure") && !code.equals("bloodSugar")) throw new NotExistsSettingException();
			settingRepository.save(Setting.builder()
					.userSeq(user.getUserSeq())
					.code(code)
					.regEmail(memberDto.getUserEmail())
					.regDt(TimeUtils.curTime())
					.modEmail(memberDto.getUserEmail())
					.modDt(TimeUtils.curTime()).build());
		}
		
	}

}
