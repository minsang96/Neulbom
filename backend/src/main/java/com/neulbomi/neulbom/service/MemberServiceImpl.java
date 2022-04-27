package com.neulbomi.neulbom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.dto.MemberDto;
import com.neulbomi.neulbom.dto.MemberModifyDto;
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
	
	private String[] settings = {"bloodPressure", "bloodSugar"};
	
	@Override
	public void signIn(MemberDto memberDto) {
		if(userRepository.findByDelYnAndUserEmail("n", memberDto.getEmail()).isPresent()) throw new ExistsUserEmailException();
		userRepository.save(User.builder()
				.userType(memberDto.getType())
				.userEmail(memberDto.getEmail())
				.userPwd(passwordEncoder.encode(memberDto.getPwd()))
				.regEmail(memberDto.getEmail())
				.regDt(TimeUtils.curTime())
				.modEmail(memberDto.getEmail())
				.modDt(TimeUtils.curTime()).build());
		
		User user = userRepository.findByDelYnAndUserEmail("n", memberDto.getEmail()).orElseThrow(()-> new NotExistsUserException());

		memberRepository.save(Member.builder()
				.userSeq(user.getUserSeq())
				.memberNickname(memberDto.getNickname())
				.memberImg(memberDto.getImg())
				.memberHeight(memberDto.getHeight())
				.memberWeight(memberDto.getWeight())
				.memberYear(memberDto.getYear())
				.memberGender(memberDto.getGender())
				.memberDesc(memberDto.getDesc())
				.memberKcal(NutrientUtils.getTotalKcal(memberDto.getGender(), memberDto.getHeight()))
				.regEmail(memberDto.getEmail())
				.regDt(TimeUtils.curTime())
				.modEmail(memberDto.getEmail())
				.modDt(TimeUtils.curTime()).build());
		
		for(String code : memberDto.getSetting()) {
			if(!code.equals("bloodPresuure") && !code.equals("bloodSugar")) throw new NotExistsSettingException();
			settingRepository.save(Setting.builder()
					.userSeq(user.getUserSeq())
					.code(code)
					.regEmail(memberDto.getEmail())
					.regDt(TimeUtils.curTime())
					.modEmail(memberDto.getEmail())
					.modDt(TimeUtils.curTime()).build());
		}
		
	}

	@Override
	public void modify(MemberModifyDto memberModifyDto) {
		Member member = memberRepository.findByDelYnAndUserSeq("n", memberModifyDto.getUserSeq()).orElseThrow(() -> new NotExistsUserException());
		
		if(!memberModifyDto.getImg().equals(member.getMemberImg())) member.setMemberImg(memberModifyDto.getImg());
		if(memberModifyDto.getHeight()!=member.getMemberHeight()) {
			member.setMemberHeight(memberModifyDto.getHeight());
			member.setMemberKcal(NutrientUtils.getTotalKcal(member.getMemberGender(), member.getMemberHeight()));
		}
		if(memberModifyDto.getWeight()!=member.getMemberWeight()) member.setMemberWeight(memberModifyDto.getWeight());
		if(!memberModifyDto.getDesc().equals(member.getMemberDesc())) member.setMemberDesc(memberModifyDto.getDesc());
		
		member.setModDt(TimeUtils.curTime());
		memberRepository.save(member);
		
		for(String code : settings) {
			boolean flag = false;
			for(String memberCode : memberModifyDto.getSetting()) {
				if(memberCode.equals(code)) {
					flag = true;
					break;
				}
			}
			if(flag) {
				if(!settingRepository.findByDelYnAndUserSeqAndCode("n", memberModifyDto.getUserSeq(), code).isPresent()) {
					settingRepository.save(Setting.builder()
							.userSeq(memberModifyDto.getUserSeq())
							.code(code)
							.regEmail(member.getRegEmail())
							.regDt(TimeUtils.curTime())
							.modEmail(member.getRegEmail())
							.modDt(TimeUtils.curTime()).build());
				}
			}
			else {
				if(settingRepository.findByDelYnAndUserSeqAndCode("n", memberModifyDto.getUserSeq(), code).isPresent()) {
					Setting setting = settingRepository.findByDelYnAndUserSeqAndCode("n", memberModifyDto.getUserSeq(), code)
							.orElseThrow(() -> new NotExistsSettingException());
					
					setting.setModDt(TimeUtils.curTime());
					setting.setDelYn("y");
					
					settingRepository.save(setting);
				}
			}
		}
		
		
		
	}

}
