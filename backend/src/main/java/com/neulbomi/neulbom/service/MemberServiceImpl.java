package com.neulbomi.neulbom.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.dto.MemberDto;
import com.neulbomi.neulbom.dto.MemberModifyDto;
import com.neulbomi.neulbom.entity.Member;
import com.neulbomi.neulbom.entity.Setting;
import com.neulbomi.neulbom.entity.User;
import com.neulbomi.neulbom.exception.ExistsUserEmailException;
import com.neulbomi.neulbom.exception.NotExistsExpertException;
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
	
	private String[] settings = {"bloodPressure","bloodSugar"};
	
	@Override
	public void signIn(MemberDto memberDto) {
		// User 테이블에 추가
		if(userRepository.findByDelYnAndUserEmail("n", memberDto.getEmail()).isPresent()) throw new ExistsUserEmailException();
		userRepository.save(User.builder()
				.userType(memberDto.getType())
				.userEmail(memberDto.getEmail())
				.userPwd(passwordEncoder.encode(memberDto.getPwd()))
				.delYn("n")
				.regEmail(memberDto.getEmail())
				.regDt(TimeUtils.curTime())
				.modEmail(memberDto.getEmail())
				.modDt(TimeUtils.curTime()).build());
		// 이메일로 유저를 못찾을 경우 예외 처리
		User user = userRepository.findByDelYnAndUserEmail("n", memberDto.getEmail()).orElseThrow(()-> new NotExistsUserException());

		// Member 테이블에 추가
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
				.delYn("n")
				.regEmail(memberDto.getEmail())
				.regDt(TimeUtils.curTime())
				.modEmail(memberDto.getEmail())
				.modDt(TimeUtils.curTime()).build());
		
		for(String code : memberDto.getSetting().keySet()) {
			// 입력받은 코드가 bloodPressure나 bloodSugar가 아닐 경우 예외 처리
			if(!code.equals("bloodPressure") && !code.equals("bloodSugar")) throw new NotExistsSettingException();
			if(memberDto.getSetting().get(code)) {
				settingRepository.save(Setting.builder()
						.userSeq(user.getUserSeq())
						.code(code)
						.delYn("n")
						.regEmail(memberDto.getEmail())
						.regDt(TimeUtils.curTime())
						.modEmail(memberDto.getEmail())
						.modDt(TimeUtils.curTime()).build());
			}
		}
		
	}

	@Override
	public void modify(MemberModifyDto memberModifyDto) {
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", memberModifyDto.getUserSeq()).orElseThrow(() -> new NotExistsUserException());
		
		// 변경된 내용만 변경
		if(!memberModifyDto.getImg().equals(member.getMemberImg())) member.setMemberImg(memberModifyDto.getImg());
		if(memberModifyDto.getHeight()!=member.getMemberHeight()) {
			member.setMemberHeight(memberModifyDto.getHeight());
			member.setMemberKcal(NutrientUtils.getTotalKcal(member.getMemberGender(), member.getMemberHeight()));
		}
		if(memberModifyDto.getWeight()!=member.getMemberWeight()) member.setMemberWeight(memberModifyDto.getWeight());
		if(!memberModifyDto.getDesc().equals(member.getMemberDesc())) member.setMemberDesc(memberModifyDto.getDesc());
		
		member.setModDt(TimeUtils.curTime());
		memberRepository.save(member);
		
		// bloodPressure, bloodSugar가 기존에 있었는지 여부 확인 후 맞게 수정
		for(String code : settings) {
			boolean flag = false;
			for(String memberCode : memberModifyDto.getSetting().keySet()) {
				if(memberModifyDto.getSetting().get(memberCode) && memberCode.equals(code)) {
					flag = true;
					break;
				}
			}
			if(flag) {
				if(!settingRepository.findByDelYnAndUserSeqAndCode("n", memberModifyDto.getUserSeq(), code).isPresent()) {
					settingRepository.save(Setting.builder()
							.userSeq(memberModifyDto.getUserSeq())
							.code(code)
							.delYn("n")
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

	@Override
	public Map<String, Object> getInfo(int userSeq) {
		Map<String, Object> result = new HashMap<>();
		
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());
		Optional<List<Setting>> list = settingRepository.findByDelYnAndUserSeq("n", userSeq);
		
		User userMember = userRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsExpertException());
		
		result.put("userType", userMember.getUserType());
		result.put("memberNickname", member.getMemberNickname());
		result.put("memberImg", member.getMemberImg());
		result.put("memberHeight", member.getMemberHeight());
		result.put("memberWeight", member.getMemberWeight());
		result.put("memberYear", member.getMemberYear());
		result.put("memberGender", member.getMemberGender());
		result.put("memberDesc", member.getMemberDesc());
		result.put("memberKcal", member.getMemberKcal());
		result.put("memberNatrium", 2000);
		result.put("memberSugar", (member.getMemberKcal()*0.1)/4);
		result.put("memberEmail", member.getRegEmail());
		
		Map<String, Object> codelist = new HashMap<>();
		for(Setting setting : list.get()) {
			codelist.put(setting.getCode(), true);
		}
		
		for(String s : settings) {
			if(codelist.get(s)==null) codelist.put(s, false);
		}
		
		result.put("setting", codelist);
		
		return result;
	}

	@Override
	public Map<String, Object> getBloodInfo(int userSeq) {
		Map<String, Object> result = new HashMap<>();
		memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(()->new NotExistsUserException());
		
		Optional<List<Setting>> list = settingRepository.findByDelYnAndUserSeq("n", userSeq);
		
		for(String code : settings) {
			boolean flag = false;
			for(Setting setting : list.get()) {
				if(setting.getCode().equals(code)) {
					flag = true;
					break;
				}
				result.put(code, flag);
			}
		}
		
		return result;
	}

	@Override
	public Map<String, Object> getChatInfo(int userSeq) {
		Map<String, Object> result = new HashMap<>();
		
		// 유저 시퀀스로 정보를 못찾을경우 예외처리
		Member member = memberRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsUserException());
		
		result.put("memberNickname", member.getMemberNickname());
		result.put("memberImg", member.getMemberImg());
		result.put("memberHeight", member.getMemberHeight());
		result.put("memberWeight", member.getMemberWeight());
		result.put("memberDesc", member.getMemberDesc());
		
		return result;
	}

}
