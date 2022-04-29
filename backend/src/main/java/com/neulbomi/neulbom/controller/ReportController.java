package com.neulbomi.neulbom.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.response.AdvancedResponseBody;
import com.neulbomi.neulbom.response.BaseResponseBody;
import com.neulbomi.neulbom.service.ReportService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/report")
@Api("리포트 API")
public class ReportController {

	@Autowired
	private ReportService reportService;

	@GetMapping("/daily/bloodsugar")
	@ApiOperation(value = "일간 혈당값 추세", notes = "유저 시퀀스와 날짜를 입력 받아 당일, 전날 혈당 값을 반환한다.")
	@ApiImplicitParams({ @ApiImplicitParam(name = "userSeq", example = "2", value = "유저 시퀀스", required = true),
						 @ApiImplicitParam(name = "date", example = "2022-04-26", value = "yyyy-mm-dd", required = true) })
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "데일리 혈당 값 조회 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청"),
			  @ApiResponse(code = 409, message = "조회 과정에서 발생하는 오류"),
			  @ApiResponse(code = 500, message = "서버 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> dailyBS(@RequestParam(name = "userSeq") int userSeq,
										  @RequestParam(name = "date") String date) {
		try {
			Map<String, Object> result = reportService.readDailyBS(userSeq, date);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "조회 성공", result));
		} catch (NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없음"));
		}
	}

	@GetMapping("/daily/bloodpressure")
	@ApiOperation(value = "일간 혈압값 추세", notes = "유저 시퀀스와 날짜를 입력 받아 당일, 전날 혈압 최고, 최저값을 반환한다.")
	@ApiImplicitParams({ @ApiImplicitParam(name = "userSeq", example = "1", value = "유저 시퀀스", required = true),
						 @ApiImplicitParam(name = "date", example = "2022-04-26", value = "yyyy-mm-dd", required = true) })
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "데일리 혈압 값 조회 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청"),
			  @ApiResponse(code = 409, message = "조회 과정에서 발생하는 오류"),
			  @ApiResponse(code = 500, message = "서버 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> dailyBP(@RequestParam(name = "userSeq") int userSeq, @RequestParam(name = "date") String date) {
		try {
			Map<String, Object> result = reportService.readDailyBP(userSeq, date);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "조회 성공", result));
		} catch (NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없음"));
		}
	}

	@GetMapping("/daily/calorie")
	@ApiOperation(value = "일간 섭취 칼로리 총합", notes = "유저 시퀀스와 날짜를 입력 받아 당일, 전날 칼로리 총합을 반환한다.")
	@ApiImplicitParams({ @ApiImplicitParam(name = "userSeq", example = "1", value = "유저 시퀀스", required = true),
						 @ApiImplicitParam(name = "date", example = "2022-04-26", value = "yyyy-mm-dd", required = true) })
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "데일리 칼로리 총합 조회 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청"),
			  @ApiResponse(code = 409, message = "조회 과정에서 발생하는 오류"),
			  @ApiResponse(code = 500, message = "서버 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> dailyKcal(@RequestParam(name = "userSeq") int userSeq, @RequestParam(name = "date") String date) {
		try {
			Map<String, Object> result = reportService.readDailyKcal(userSeq, date);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "조회 성공", result));
		} catch (NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없음"));
		}
	}

	@GetMapping("/daily/nutrient")
	@ApiOperation(value = "일간 섭취 영양소 비율", notes = "유저 시퀀스와 날짜를 입력받아 권장 영양소의 양과 섭취 영양소의 양을 반환한다.")
	@ApiImplicitParams({ @ApiImplicitParam(name = "userSeq", example = "1", value = "유저 시퀀스", required = true), 
						 @ApiImplicitParam(name = "date", example = "2022-04-26", value = "yyyy-mm-dd", required = true) })
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "데일리 영양소 정보 조회 성공"),
				@ApiResponse(code = 400, message = "잘못된 요청"),
				@ApiResponse(code = 409, message = "조회 과정에서 발생하는 오류"),
				@ApiResponse(code = 500, message = "서버 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> dailyNutrient(@RequestParam(name = "userSeq") int userSeq, @RequestParam(name = "date") String date) {
		try {
			Map<String, Object> result = reportService.readDailyNutrient(userSeq, date);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "조회 성공", result));
		} catch (NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없음"));
		}
	}
	
	@GetMapping("/weekly/bloodsugar")
	@ApiOperation(value = "주간 공복 혈당값 추세", notes = "유저 시퀀스와 날짜를 입력 받아 일주일 아침 공복 혈당 값을 반환한다.")
	@ApiImplicitParams({ @ApiImplicitParam(name = "userSeq", example = "2", value = "유저 시퀀스", required = true),
						 @ApiImplicitParam(name = "date", example = "2022-04-26", value = "yyyy-mm-dd", required = true) })
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "주간 공복 혈당 값 조회 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청"),
			  @ApiResponse(code = 409, message = "조회 과정에서 발생하는 오류"),
			  @ApiResponse(code = 500, message = "서버 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> weeklyBS(@RequestParam(name = "userSeq") int userSeq,
										  					   @RequestParam(name = "date") String date) {
		try {
			Map<String, Object> result = reportService.readWeeklyBS(userSeq, date);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "조회 성공", result));
		} catch (NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없음"));
		}
	}
	
	@GetMapping("/weekly/bloodpressure")
	@ApiOperation(value = "주간 혈압 최고 최저값 추세", notes = "유저 시퀀스와 날짜를 입력 받아 일주일 혈압 최고, 최저 평균값을 반환한다.")
	@ApiImplicitParams({ @ApiImplicitParam(name = "userSeq", example = "1", value = "유저 시퀀스", required = true),
						 @ApiImplicitParam(name = "date", example = "2022-04-26", value = "yyyy-mm-dd", required = true) })
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "주간 혈압값 조회 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청"),
			  @ApiResponse(code = 409, message = "조회 과정에서 발생하는 오류"),
			  @ApiResponse(code = 500, message = "서버 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> weeklyBP(@RequestParam(name = "userSeq") int userSeq, @RequestParam(name = "date") String date) {
		try {
			Map<String, Object> result = reportService.readWeeklyBP(userSeq, date);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "조회 성공", result));
		} catch (NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없음"));
		}
	}
	
	
	@GetMapping("/weekly/calorie")
	@ApiOperation(value = "일간 섭취 칼로리 총합", notes = "유저 시퀀스와 날짜를 입력 받아 전주, 이번주 섭취 칼로리 총합을 반환한다.")
	@ApiImplicitParams({ @ApiImplicitParam(name = "userSeq", example = "1", value = "유저 시퀀스", required = true),
						 @ApiImplicitParam(name = "date", example = "2022-04-26", value = "yyyy-mm-dd", required = true) })
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "주간 섭취 칼로리 총합 조회 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청"),
			  @ApiResponse(code = 409, message = "조회 과정에서 발생하는 오류"),
			  @ApiResponse(code = 500, message = "서버 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> weeklyKcal(@RequestParam(name = "userSeq") int userSeq, @RequestParam(name = "date") String date) {
		try {
			Map<String, Object> result = reportService.readWeeklyKcal(userSeq, date);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "조회 성공", result));
		} catch (NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없음"));
		}
	}
	
	@GetMapping("/weekly/nutrient")
	@ApiOperation(value = "주간 섭취 영양소 비율", notes = "유저 시퀀스와 날짜를 입력받아 주간 권장 영양소의 양과 섭취 영양소의 양을 반환한다.")
	@ApiImplicitParams({ @ApiImplicitParam(name = "userSeq", example = "1", value = "유저 시퀀스", required = true), 
						 @ApiImplicitParam(name = "date", example = "2022-04-26", value = "yyyy-mm-dd", required = true) })
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "주간 영양소 정보 조회 성공"),
				@ApiResponse(code = 400, message = "잘못된 요청"),
				@ApiResponse(code = 409, message = "조회 과정에서 발생하는 오류"),
				@ApiResponse(code = 500, message = "서버 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> weeklyNutrient(@RequestParam(name = "userSeq") int userSeq, @RequestParam(name = "date") String date) {
		try {
			Map<String, Object> result = reportService.readWeeklyNutrient(userSeq, date);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "조회 성공", result));
		} catch (NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없음"));
		}
	}
}
