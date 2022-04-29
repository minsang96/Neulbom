package com.neulbomi.neulbom.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.neulbomi.neulbom.dto.BloodPressureDto;
import com.neulbomi.neulbom.dto.BloodSugarDto;
import com.neulbomi.neulbom.entity.BloodPressure;
import com.neulbomi.neulbom.entity.BloodSugar;
import com.neulbomi.neulbom.exception.ExistsUserEmailException;
import com.neulbomi.neulbom.exception.NotExistsSettingException;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.exception.WrongCommonCodeException;
import com.neulbomi.neulbom.exception.WrongDateException;
import com.neulbomi.neulbom.exception.WrongTimeException;
import com.neulbomi.neulbom.response.AdvancedResponseBody;
import com.neulbomi.neulbom.response.BaseResponseBody;
import com.neulbomi.neulbom.service.RecordService;
import com.neulbomi.neulbom.util.TimeUtils;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/record")
@Api("혈당, 혈압 기록 API")
public class RecordController {
	
	@Autowired
	private RecordService recordService;
	
	@GetMapping("/bs")
	@ApiOperation(value = "날짜 별 혈당 기록 조회", notes = "해당 유저 시퀀스의 날짜 별 혈당 기록을 조회한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 201, message = "혈당 조회 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류"),
			  @ApiResponse(code = 409, message = "조회 과정에서 발생하는 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> getBloodSugar(@RequestParam int userSeq, @RequestParam String bsDate) {
		try {
			List<Map<String, Object>> result = recordService.getBsByDate(userSeq, bsDate);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "혈당 기록 조회 성공",result));
		}
		catch(NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "User 테이블에서 계정 정보를 조회할 수 없습니다."));
		}
		catch(WrongDateException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 날짜 양식입니다. YYYY-MM-DD 형식으로 입력해주세요."));
		}
	}
	
	@PostMapping("/bs")
	@ApiOperation(value = "혈당 기록 추가", notes = "해당 유저 시퀀스의 혈당 기록을 추가한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 201, message = "혈당 추가 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류"),
			  @ApiResponse(code = 409, message = "추가 과정에서 발생하는 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> addBloodSugar(@RequestBody BloodSugarDto bloodSugarDto) {
		try {
			recordService.addBs(bloodSugarDto);
			return ResponseEntity.status(201).body(BaseResponseBody.of(201, "혈당 기록 추가 성공"));
		}
		catch(NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "User 테이블에서 계정 정보를 조회할 수 없습니다."));
		}
		catch(WrongDateException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 날짜 양식입니다. YYYY-MM-DD 형식으로 입력해주세요."));
		}
		catch(WrongTimeException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 시간 양식입니다. HH:MM 형식으로 입력해주세요."));
		}
		catch(WrongCommonCodeException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 공통 코드입니다."));
		}
	}
	
	@GetMapping("/bp")
	@ApiOperation(value = "날짜 별 혈압 기록 조회", notes = "해당 유저 시퀀스의 날짜 별 혈압 기록을 조회한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 201, message = "혈압 조회 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류"),
			  @ApiResponse(code = 409, message = "조회 과정에서 발생하는 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> getBloodPressure(@RequestParam int userSeq, @RequestParam String bpDate) {
		try {
			List<Map<String, Object>> result = recordService.getBpByDate(userSeq, bpDate);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "혈압 기록 조회 성공",result));
		}
		catch(NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "User 테이블에서 계정 정보를 조회할 수 없습니다."));
		}
		catch(WrongDateException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 날짜 양식입니다. YYYY-MM-DD 형식으로 입력해주세요."));
		}
	}
	
	@PostMapping("/bp")
	@ApiOperation(value = "혈압 기록 추가", notes = "해당 유저 시퀀스의 혈압 기록을 추가한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 201, message = "혈압 추가 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류"),
			  @ApiResponse(code = 409, message = "추기 과정에서 발생하는 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> addBloodPressure(@RequestBody BloodPressureDto bloodPressureDto) {
		try {
			recordService.addBp(bloodPressureDto);
			return ResponseEntity.status(201).body(BaseResponseBody.of(201, "혈압 기록 추가 성공"));
		}
		catch(NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "User 테이블에서 계정 정보를 조회할 수 없습니다."));
		}
		catch(WrongDateException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 날짜 양식입니다. YYYY-MM-DD 형식으로 입력해주세요."));
		}
		catch(WrongTimeException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 시간 양식입니다. HH:MM 형식으로 입력해주세요."));
		}
		catch(WrongCommonCodeException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 공통 코드입니다."));
		}
	}
}
