package com.neulbomi.neulbom.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.neulbomi.neulbom.dto.DietDto;
import com.neulbomi.neulbom.dto.EmailDto;
import com.neulbomi.neulbom.dto.ExpertJoinDto;
import com.neulbomi.neulbom.entity.Expert;
import com.neulbomi.neulbom.entity.User;
import com.neulbomi.neulbom.exception.ExistsUserEmailException;
import com.neulbomi.neulbom.exception.NotExistsExpertException;
import com.neulbomi.neulbom.exception.NotExistsImgException;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.repository.ExpertRepository;
import com.neulbomi.neulbom.response.AdvancedResponseBody;
import com.neulbomi.neulbom.response.BaseResponseBody;
import com.neulbomi.neulbom.service.ExpertService;
import com.neulbomi.neulbom.service.MailService;
import com.neulbomi.neulbom.service.UserService;
import com.neulbomi.neulbom.util.MailContentBuilder;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/expert")
@Api("전문가 컨트롤러 API")
public class DietController {

	@Autowired
	ExpertService expertService;

	@Autowired
	UserService userService;

	@Autowired
	ExpertRepository expertRepository;

	@PostMapping("/record")
	@ApiOperation(value = "식단 기록", notes = "사용자가 입력한 식단 정보를 등록한다.", response = BaseResponseBody.class)
	@ApiResponses({ @ApiResponse(code = 200, message = "식단 기록 성공"),
		    @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			@ApiResponse(code = 500, message = "서버 오류"),
			})
	public ResponseEntity<? extends BaseResponseBody> dietRecord(@RequestBody DietDto dietDto, @RequestPart MultipartFile file) {



		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "식단 기록 성공"));
	}

}
