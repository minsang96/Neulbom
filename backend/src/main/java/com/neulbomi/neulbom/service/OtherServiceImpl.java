package com.neulbomi.neulbom.service;

import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.dto.OtherDto;
import com.neulbomi.neulbom.entity.Other;
import com.neulbomi.neulbom.entity.User;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.exception.WrongCommonCodeException;
import com.neulbomi.neulbom.exception.WrongDateException;
import com.neulbomi.neulbom.exception.WrongTimeException;
import com.neulbomi.neulbom.repository.OtherRepository;
import com.neulbomi.neulbom.repository.UserRepository;
import com.neulbomi.neulbom.util.TimeUtils;

@Service
public class OtherServiceImpl implements OtherService{

	@Autowired
	OtherRepository otherRepository;
	
	@Autowired
	UserRepository userRepository;
	
	private boolean codeCheck(String code) {
		String[] codeList = {"alcohol","coffee","exercise"};
		for(String s : codeList) {
			if(s.equals(code)) return true;
		}
		return false;
	}
	
	@Override
	public void addRecord(OtherDto otherDto) {
		
		User user = userRepository.findByDelYnAndUserSeq("n", otherDto.getUserSeq()).orElseThrow(() -> new NotExistsUserException());
		
		if(!codeCheck(otherDto.getCode())) throw new WrongCommonCodeException();
		if(!Pattern.matches("^(19|20)\\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$", otherDto.getOtherDate()))
			throw new WrongDateException();
		if(!Pattern.matches("([01][0-9]|2[0-3]):([0-5][0-9])$", otherDto.getOtherTime()))
			throw new WrongTimeException();
		otherRepository.save(Other.builder()
				.code(otherDto.getCode())
				.userSeq(otherDto.getUserSeq())
				.otherDate(otherDto.getOtherDate())
				.otherTime(otherDto.getOtherTime())
				.regEmail(user.getUserEmail())
				.regDt(TimeUtils.curTime())
				.modEmail(user.getUserEmail())
				.modDt(TimeUtils.curTime()).build());
		
	}

}
