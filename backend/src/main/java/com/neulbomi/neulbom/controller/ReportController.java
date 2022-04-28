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
	@ApiImplicitParams({ @ApiImplicitParam(name = "userSeq", value = "유저 시퀀스", required = true),
						 @ApiImplicitParam(name = "date", value = "yyyy-mm-dd", required = true) })
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
	@ApiImplicitParams({ @ApiImplicitParam(name = "userSeq", value = "유저 시퀀스", required = true),
		@ApiImplicitParam(name = "date", value = "yyyy-mm-dd", required = true) })
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "데일리 혈압 값 조회 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청"),
			  @ApiResponse(code = 409, message = "조회 과정에서 발생하는 오류"),
			  @ApiResponse(code = 500, message = "서버 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> dailyBP(@RequestParam(name = "userSeq") int userSeq,
			@RequestParam(name = "date") String date) {
		
		try {
			Map<String, Object> result = reportService.readDailyBP(userSeq, date);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "조회 성공", result));

		} catch (NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없음"));
		}
		
	}

}
