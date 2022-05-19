package com.neulbomi.neulbom.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neulbomi.neulbom.dto.BloodPressureDto;
import com.neulbomi.neulbom.dto.BloodSugarDto;
import com.neulbomi.neulbom.entity.BloodPressure;
import com.neulbomi.neulbom.entity.BloodSugar;
import com.neulbomi.neulbom.entity.User;
import com.neulbomi.neulbom.exception.NotExistsRecordException;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.exception.WrongCommonCodeException;
import com.neulbomi.neulbom.exception.WrongDateException;
import com.neulbomi.neulbom.exception.WrongTimeException;
import com.neulbomi.neulbom.repository.BloodPressureRepository;
import com.neulbomi.neulbom.repository.BloodSugarRepository;
import com.neulbomi.neulbom.repository.UserRepository;
import com.neulbomi.neulbom.util.TimeUtils;

@Service
public class RecordServiceImpl implements RecordService{

	@Autowired
	BloodSugarRepository bsRepository;
	
	@Autowired
	BloodPressureRepository bpRepository;
	
	@Autowired
	UserRepository userRepository;
	
	private boolean codeCheck(String code) {
		String[] codeList = {"beforeBreakfast","breakfast","afterBreakfast","beforeLunch","lunch","afterLunch","beforeDinner",
								"dinner","afterDinner"};
		for(String s : codeList) {
			if(s.equals(code)) return true;
		}
		return false;
	}
	
	@Override
	public List<Map<String, Object>> getBsByDate(int userSeq, String bsDate) {
		userRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(()-> new NotExistsUserException());
		if(!Pattern.matches("^(19|20)\\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$", bsDate))
			throw new WrongDateException();
		
		List<BloodSugar> list = bsRepository.findUserDailyBS(userSeq, bsDate);
		List<Map<String, Object>> result = new ArrayList<>();
		
		for(BloodSugar bs : list) {
			Map<String, Object> obj = new HashMap<>();
			obj.put("bsSeq", bs.getBsSeq());
			obj.put("userSeq", bs.getUserSeq());
			obj.put("bsCode", bs.getBsCode());
			obj.put("bsDate", bs.getBsDate());
			obj.put("bsTime", bs.getBsTime());
			obj.put("bsLevel", bs.getBsLevel());
			
			result.add(obj);
		}
		
		return result;
	}

	@Override
	public void addBs(BloodSugarDto bloodSugarDto) {
		User user = userRepository.findByDelYnAndUserSeq("n", bloodSugarDto.getUserSeq()).orElseThrow(()-> new NotExistsUserException());
		
		if(!Pattern.matches("^(19|20)\\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$", bloodSugarDto.getBsDate()))
			throw new WrongDateException();
		if(!Pattern.matches("([01][0-9]|2[0-3]):([0-5][0-9])$", bloodSugarDto.getBsTime()))
			throw new WrongTimeException();
		if(!codeCheck(bloodSugarDto.getBsCode()))
			throw new WrongCommonCodeException();
		
		bsRepository.save(BloodSugar.builder().
				userSeq(bloodSugarDto.getUserSeq())
				.bsCode(bloodSugarDto.getBsCode())
				.bsLevel(bloodSugarDto.getBsLevel())
				.bsDate(bloodSugarDto.getBsDate())
				.bsTime(bloodSugarDto.getBsTime())
				.regEmail(user.getUserEmail())
				.regDt(TimeUtils.curTime())
				.modEmail(user.getUserEmail())
				.modDt(TimeUtils.curTime()).build());
	}

	@Override
	public List<Map<String, Object>> getBpByDate(int userSeq, String bpDate) {
		userRepository.findByDelYnAndUserSeq("n", userSeq).orElseThrow(()-> new NotExistsUserException());
		
		if(!Pattern.matches("^(19|20)\\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$", bpDate))
			throw new WrongDateException();
		
		List<BloodPressure> list = bpRepository.findUserDailyBP(userSeq, bpDate);
		List<Map<String, Object>> result = new ArrayList<>();
		
		for(BloodPressure bp : list) {
			Map<String, Object> obj = new HashMap<>();
			obj.put("bpSeq", bp.getBpSeq());
			obj.put("userSeq", bp.getUserSeq());
			obj.put("bpCode", bp.getBpCode());
			obj.put("bpDate", bp.getBpDate());
			obj.put("bpTime", bp.getBpTime());
			obj.put("bpHigh", bp.getBpHigh());
			obj.put("bpLow", bp.getBpLow());
			
			result.add(obj);
		}
		
		return result;
	}

	@Override
	public void addBp(BloodPressureDto bloodPressureDto) {
		User user = userRepository.findByDelYnAndUserSeq("n", bloodPressureDto.getUserSeq()).orElseThrow(()-> new NotExistsUserException());

		if(!Pattern.matches("^(19|20)\\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$", bloodPressureDto.getBpDate()))
			throw new WrongDateException();
		if(!Pattern.matches("([01][0-9]|2[0-3]):([0-5][0-9])$", bloodPressureDto.getBpTime()))
			throw new WrongTimeException();
		if(!codeCheck(bloodPressureDto.getBpCode()))
			throw new WrongCommonCodeException();
		
		String code = bloodPressureDto.getBpCode();
		if(code.equals("beforeBreakfast") || code.equals("afterBreakfast"))
			code = "breakfast";
		else if(code.equals("beforeLunch") || code.equals("afterLunch"))
			code = "lunch";
		else if(code.equals("beforeDinner") || code.equals("afterDinner"))
			code = "dinner";
		
		bpRepository.save(BloodPressure.builder().
				userSeq(bloodPressureDto.getUserSeq())
				.bpCode(code)
				.bpHigh(bloodPressureDto.getBpHigh())
				.bpLow(bloodPressureDto.getBpLow())
				.bpDate(bloodPressureDto.getBpDate())
				.bpTime(bloodPressureDto.getBpTime())
				.regEmail(user.getUserEmail())
				.regDt(TimeUtils.curTime())
				.modEmail(user.getUserEmail())
				.modDt(TimeUtils.curTime()).build());
		
	}

	@Override
	public void deleteBs(long bsSeq) {
		BloodSugar bloodSugar = bsRepository.findByDelYnAndBsSeq("n", bsSeq).orElseThrow(() -> new NotExistsRecordException());
		bloodSugar.setDelYn("y");
		
		bsRepository.save(bloodSugar);
		
	}

	@Override
	public void deleteBp(long bpSeq) {
		BloodPressure bloodPressure = bpRepository.findByDelYnAndBpSeq("n", bpSeq).orElseThrow(() -> new NotExistsRecordException());
		bloodPressure.setDelYn("y");
		
		bpRepository.save(bloodPressure);
		
	}

}
