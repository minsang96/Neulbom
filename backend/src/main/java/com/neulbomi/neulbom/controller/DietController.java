package com.neulbomi.neulbom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.neulbomi.neulbom.dto.DietDto;
import com.neulbomi.neulbom.exception.EmptyFileException;
import com.neulbomi.neulbom.exception.FileUploadFailedException;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.repository.ExpertRepository;
import com.neulbomi.neulbom.response.BaseResponseBody;
import com.neulbomi.neulbom.service.DietService;
import com.neulbomi.neulbom.service.ExpertService;
import com.neulbomi.neulbom.service.UserService;

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
	DietService dietService;

	@Autowired
	ExpertRepository expertRepository;

	@PostMapping("/record")
	@ApiOperation(value = "식단 기록", notes = "사용자가 입력한 식단 정보를 등록한다.", response = BaseResponseBody.class)
	@ApiResponses({ @ApiResponse(code = 200, message = "식단 기록 성공"),
					@ApiResponse(code = 400, message = "잘못된 요청입니다."),
					@ApiResponse(code = 409, message = "파일 업로드에 실패했습니다."),
					@ApiResponse(code = 415, message = "유효하지 않은 파일입니다."),
					@ApiResponse(code = 500, message = "서버 오류"), })
	public ResponseEntity<? extends BaseResponseBody> dietRecord(DietDto dietDto,
			@RequestPart(value = "file") MultipartFile dietImg) {
		try {
			dietService.recordDiet(dietDto, dietImg);
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "식단 기록 성공"));
		} catch (NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없습니다."));
		} catch (EmptyFileException e) {
			return ResponseEntity.status(415).body(BaseResponseBody.of(415, "유효하지 않은 파일입니다."));
		} catch (FileUploadFailedException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "파일 업로드에 실패했습니다."));
		}
	}

}
