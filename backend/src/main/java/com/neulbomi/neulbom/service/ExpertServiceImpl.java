package com.neulbomi.neulbom.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.dto.CareerModifyDto;
import com.neulbomi.neulbom.dto.ExpertJoinDto;
import com.neulbomi.neulbom.dto.ExpertModifyDto;
import com.neulbomi.neulbom.entity.Career;
import com.neulbomi.neulbom.entity.Expert;
import com.neulbomi.neulbom.entity.User;
import com.neulbomi.neulbom.exception.ExistsUserEmailException;
import com.neulbomi.neulbom.exception.NotExistsExpertException;
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
	public Expert getExpertByUserSeq(int userSeq) {
		Optional<Expert> expert = expertRepository.findByDelYnAndUserSeq("n", userSeq);
		if(!expert.isPresent()) return null;
		return expert.get();
	}

	@Override
	public Map<String, Object> getExpertInfoDetail(int userSeq) {
		// 전문가 찾기
		Expert expert = expertRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsExpertException());
		
		Map<String, Object> result = new HashMap<>();
		result.put("userSeq", expert.getUserSeq());
		result.put("expertName", expert.getExpertName());
		result.put("expertImg", expert.getExpertImg());
		result.put("expertDesc", expert.getExpertDesc());
		result.put("expertCert", expert.getExpertCert());
		
		ArrayList<Career> careers = careerRepository.findByDelYnAndUserSeq("n", userSeq);
		ArrayList<Map<String, Object>> careerList = new ArrayList<Map<String,Object>>();
		for (Career career : careers) {
			Map<String, Object> obj = new HashMap<>();
			obj.put("careerSeq", career.getCareerSeq());
			obj.put("careerContent", career.getCareerContent());
			careerList.add(obj);
		}
		result.put("expertCareer",  careerList);
 
		return result;
	}

	@Override
	public Map<String, Object> getExpertInfoDefault(int userSeq) {
		// 전문가 찾기
		Expert expert = expertRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsExpertException());
		
		Map<String, Object> result = new HashMap<>();
		result.put("userSeq", expert.getUserSeq());
		result.put("expertName", expert.getExpertName());
		result.put("expertImg", expert.getExpertImg());
		result.put("expertDesc", expert.getExpertDesc());
 
		return result;
	}

	@Override
	public Map<String, Object> getInfo(int userSeq) {
		// 전문가 찾기
		User userExpert = userRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsExpertException());
		Expert expert = expertRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(() -> new NotExistsExpertException());
		
		Map<String, Object> info =new HashMap<>();
		info.put("userSeq", expert.getUserSeq());
		info.put("userEmail", userExpert.getUserEmail());
		info.put("expertName", expert.getExpertName());
		info.put("expertImg", expert.getExpertImg());
		info.put("expertDesc", expert.getExpertDesc());
		info.put("expertCert", expert.getExpertCert());
		
		// 경력정보
		ArrayList<Career> careers = careerRepository.findByDelYnAndUserSeq("n", userSeq);
		ArrayList<Map<String, Object>> careerList = new ArrayList<Map<String,Object>>();
		for (Career career : careers) {
			Map<String, Object> obj = new HashMap<>();
			obj.put("careerSeq", career.getCareerSeq());
			obj.put("careerContent", career.getCareerContent());
			careerList.add(obj);
		}
		info.put("expertCareer",  careerList);
		
		return info;
	}

	@Override
	public void modify(ExpertModifyDto expertModifyDto) {
		// 현재 시간
		String now = TimeUtils.curTime();
				
		// 전문가 찾기
		User userExpert = userRepository.findByDelYnAndUserSeq("n", expertModifyDto.getUserSeq()).orElseThrow(() -> new NotExistsExpertException());
		Expert expert = expertRepository.findByDelYnAndUserSeq("n", expertModifyDto.getUserSeq()).orElseThrow(() -> new NotExistsExpertException());
		// 정보 수정하기
		if(!expertModifyDto.getDesc().equals(expert.getExpertDesc())) {
			expert.setExpertDesc(expertModifyDto.getDesc());
		}
		
		ArrayList<CareerModifyDto> modifyCareers = expertModifyDto.getCareer();
		// 이력 수정하기
		ArrayList<Career> careers = careerRepository.findByDelYnAndUserSeq("n", expertModifyDto.getUserSeq());
		
		for(int n = modifyCareers.size() - 1; n >= 0; n--) {
			CareerModifyDto modifyDto = modifyCareers.get(n);
			// careerSeq = 0이면 새로 추가한 경력!
			if(modifyDto.getCareerSeq() == 0) {
				careerRepository.save(Career.builder()
						.userSeq(expert.getUserSeq())
						.careerContent(modifyDto.getCareerContent())
						.regDt(now)
						.regEmail(userExpert.getUserEmail())
						.modDt(now)
						.modEmail(userExpert.getUserEmail())
						.build());
			}
			
			// 원래 있던 경력 수정 한 것
			else {
				Career career = careerRepository.findByDelYnAndCareerSeq("n", modifyDto.getCareerSeq());
				if(!career.getCareerContent().equals(modifyDto.getCareerContent())) {
					career.setCareerContent(modifyDto.getCareerContent());
					career.setModDt(now);
					career.setModEmail(userExpert.getUserEmail());
					careerRepository.save(career);
				}
				careers.remove(career);
			}
		}
		
		for (Career career : careers) {
			career.setDelYn("y");
			careerRepository.save(career);
		}
	}
}