package com.neulbomi.neulbom.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.multipart.MultipartFile;

import com.neulbomi.neulbom.dto.DietDto;
import com.neulbomi.neulbom.exception.EmptyFileException;
import com.neulbomi.neulbom.exception.FailAnalyzeFoodException;
import com.neulbomi.neulbom.exception.FileUploadFailedException;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.exception.NotJPGException;
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
					@ApiResponse(code = 409, message = "계정 정보를 조회할 수 없습니다."),
					@ApiResponse(code = 500, message = "서버 오류"), })
	public ResponseEntity<? extends BaseResponseBody> dietRemove(@RequestHeader String Authorization,
			@RequestParam int userSeq, @RequestBody long[] dietSeqs) {
		try {
			if (!userService.getUserByUserSeq(userSeq).getUserEmail().equals(jwtTokenProvider.getUserPk(Authorization)))
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
					@ApiResponse(code = 409, message = "계정 정보를 조회할 수 없습니다."),
					@ApiResponse(code = 500, message = "서버 오류"), })
	public ResponseEntity<? extends BaseResponseBody> dietDaily(@RequestParam int userSeq,
			@RequestParam String dietDate) {
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
	public ResponseEntity<? extends BaseResponseBody> searchFood(@RequestParam String keyword,
			@RequestParam(value = "page", defaultValue = "1") int page,
			@RequestParam(value = "size", defaultValue = "10") int size) {
		try {
			List<JSONObject> foodList = dietService.searchFood(keyword, page, size);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "음식 검색 성공", foodList));
		} catch (Exception e) {
			return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 오류입니다."));
		}
	}

	@GetMapping("/weekly")
	@ApiOperation(value = "일주일 식단, 기록 목록 조회", notes = "일주일 식단, 기록 목록을 조회한다.", response = BaseResponseBody.class)
	@ApiResponses({ @ApiResponse(code = 200, message = "일주일 식단, 기록 목록을 조회 성공"),
					@ApiResponse(code = 400, message = "잘못된 요청입니다."),
					@ApiResponse(code = 500, message = "서버 오류"), })
	public ResponseEntity<? extends BaseResponseBody> dietWeekly(@RequestParam(name = "userSeq") int userSeq,
			@RequestParam(name = "date") String date) {
		try {
			HashMap<String, HashMap<String, ArrayList<String>>> weeklyDietList = dietService.dietWeekly(userSeq, date);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "일주일 식단 조회 성공", weeklyDietList));
		} catch (NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없습니다."));
		} catch (Exception e) {
			return ResponseEntity.status(500).body(BaseResponseBody.of(500, "날짜 변환에 실패했습니다."));
		}
	}

	@PostMapping("/analyze")
	@ApiOperation(value = "음식 분석", notes = "음식 사진을 분석하여 정보를 반환한다.", response = BaseResponseBody.class)
	@ApiResponses({ @ApiResponse(code = 200, message = "음식 분석 성공/실패"),
					@ApiResponse(code = 400, message = "잘못된 요청입니다."),
					@ApiResponse(code = 409, message = "계정 정보를 조회할 수 없습니다."),
					@ApiResponse(code = 500, message = "서버 오류"), })
	public ResponseEntity<? extends BaseResponseBody> foodAnalyze(@RequestParam int userSeq,
			@RequestPart MultipartFile file) {
		JSONObject result  = null;
		try {
			result = dietService.foodAnalyze(userSeq, file);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "음식 분석 성공", result));
		} catch (NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없습니다."));
		} catch (FailAnalyzeFoodException e) {
			e.printStackTrace();
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "음식 분석 실패, 음식 검색을 이용하세요."));
		} catch (HttpStatusCodeException e) {
			HttpStatus errorHttpStatus = HttpStatus.valueOf(e.getStatusCode().value());
			return ResponseEntity.status(errorHttpStatus).body(BaseResponseBody.of(errorHttpStatus.value(), "요청 실패"));
		} catch (NotJPGException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "jpg파일이 아닙니다."));
		} catch(Exception e) {
			return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 오류"));
		}

	}
}
