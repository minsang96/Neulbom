package com.neulbomi.neulbom.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.neulbomi.neulbom.dto.DietDto;
import com.neulbomi.neulbom.exception.EmptyFileException;
import com.neulbomi.neulbom.exception.FileUploadFailedException;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.repository.ExpertRepository;
import com.neulbomi.neulbom.response.AdvancedResponseBody;
import com.neulbomi.neulbom.response.BaseResponseBody;
import com.neulbomi.neulbom.service.DietService;
import com.neulbomi.neulbom.service.ExpertService;
import com.neulbomi.neulbom.service.UserService;
import com.neulbomi.neulbom.util.JwtTokenProvider;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/diet")
@Api("식단 컨트롤러 API")
public class DietController {

	@Autowired
	ExpertService expertService;

	@Autowired
	UserService userService;

	@Autowired
	DietService dietService;

	@Autowired
	ExpertRepository expertRepository;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@PostMapping("/record")
	@ApiOperation(value = "식단 기록", notes = "사용자가 입력한 식단 정보를 등록한다.", response = BaseResponseBody.class)
	@ApiResponses({ @ApiResponse(code = 200, message = "식단 기록 성공"),
					@ApiResponse(code = 400, message = "잘못된 요청입니다."),
					@ApiResponse(code = 409, message = "파일 업로드에 실패했습니다."),
					@ApiResponse(code = 415, message = "유효하지 않은 파일입니다."),
					@ApiResponse(code = 500, message = "서버 오류"), })
	public ResponseEntity<? extends BaseResponseBody> dietRecord(@RequestBody ArrayList<DietDto> dietDto) {
		try {
			dietService.recordDiet(dietDto);
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "식단 기록 성공"));
		} catch (NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없습니다."));
		} catch (EmptyFileException e) {
			return ResponseEntity.status(415).body(BaseResponseBody.of(415, "유효하지 않은 파일입니다."));
		} catch (FileUploadFailedException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "파일 업로드에 실패했습니다."));
		}
	}
	
	@PostMapping("/remove")
	@ApiOperation(value = "식단 삭제", notes = "사용자가 입력한 식단 정보를 삭제한다.", response = BaseResponseBody.class)
	@ApiResponses({ @ApiResponse(code = 200, message = "식단 삭제 성공"),
					@ApiResponse(code = 400, message = "잘못된 요청입니다."),
					@ApiResponse(code = 500, message = "서버 오류"), })
	public ResponseEntity<? extends BaseResponseBody> dietRemove(@RequestHeader String Authorization, @RequestParam int userSeq, @RequestBody long[] dietSeqs) {
		try {
			if(!userService.getUserByUserSeq(userSeq).getUserEmail().equals(jwtTokenProvider.getUserPk(Authorization)))
				return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 토큰입니다."));
			dietService.removeDiet(dietSeqs);
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "식단 삭제 성공"));
		} catch (NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없습니다."));
		} catch (EmptyFileException e) {
			return ResponseEntity.status(415).body(BaseResponseBody.of(415, "유효하지 않은 파일입니다."));
		}
	}
	
	@GetMapping("/daily")
	@ApiOperation(value = "하루 식단 조회", notes = "사용자가 보낸 날짜의 식단 기록을 조회한다.", response = BaseResponseBody.class)
	@ApiResponses({ @ApiResponse(code = 200, message = "하루 식단 조회 성공"),
					@ApiResponse(code = 400, message = "잘못된 요청입니다."),
					@ApiResponse(code = 500, message = "서버 오류"), })
	public ResponseEntity<? extends BaseResponseBody> dietDaily(@RequestParam int userSeq, @RequestParam String dietDate) {
		try {
			HashMap<String, Object> dailyDietList = dietService.dietDaily(userSeq, dietDate);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "하루 식단 조회 성공", dailyDietList));
		} catch (NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없습니다."));
		}
	}
	
	@GetMapping("/search")
	@ApiOperation(value = "음식 검색", notes = "사용자가 입력한 키워드로 음식을 검색한다.", response = BaseResponseBody.class)
	@ApiResponses({ @ApiResponse(code = 200, message = "음식 검색 성공"),
					@ApiResponse(code = 400, message = "잘못된 요청입니다."),
					@ApiResponse(code = 500, message = "서버 오류"), })
	public ResponseEntity<? extends BaseResponseBody> searchFood(@RequestParam String keyword, @RequestParam(value = "page", defaultValue = "1") int page, @RequestParam(value = "size", defaultValue = "10") int size) {
		List<JSONObject> foodList = dietService.searchFood(keyword, page, size);
		return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "음식 검색 성공", foodList));
	}
}
