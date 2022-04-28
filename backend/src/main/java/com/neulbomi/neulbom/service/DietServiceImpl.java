package com.neulbomi.neulbom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.neulbomi.neulbom.dto.DietDto;
import com.neulbomi.neulbom.entity.Diet;
import com.neulbomi.neulbom.entity.User;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.repository.DietRepository;
import com.neulbomi.neulbom.util.TimeUtils;

@Service
public class DietServiceImpl implements DietService {
	
	@Autowired
	DietRepository dietRepository;
	
	@Autowired
	UserService userService;
	
	@Autowired
	AwsS3Service aswS3Service;

	@Override
	public void recordDiet(DietDto dietDto, MultipartFile dietImg) {
		// 현재 시간
		String now = TimeUtils.curTime();
		
		User user = userService.getUserByUserSeq(dietDto.getUserSeq());
		if(user == null) throw new NotExistsUserException();
		
		String dietImgUrl = aswS3Service.uploadFileV1("Diet", user.getUserSeq(), dietImg);

		dietRepository.save(Diet.builder()
				.userSeq(dietDto.getUserSeq())
				.dietTime(dietDto.getDietTime())
				.foodCode(dietDto.getFoodCode())
				.dietImg(dietImgUrl)
				.dietAmount(dietDto.getFoodAmount())
				.dietDate(dietDto.getDietDate())
				.regDt(now)
				.regEmail(user.getUserEmail())
				.modDt(now)
				.modEmail(user.getUserEmail())
				.build());
	}

}
