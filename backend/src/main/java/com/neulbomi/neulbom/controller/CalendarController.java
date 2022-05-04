package com.neulbomi.neulbom.controller;

import java.util.HashMap;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.neulbomi.neulbom.exception.NotExistsExpertException;
import com.neulbomi.neulbom.exception.WrongDateException;
import com.neulbomi.neulbom.response.AdvancedResponseBody;
import com.neulbomi.neulbom.response.BaseResponseBody;
import com.neulbomi.neulbom.service.CalendarService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/calendar")
@Api("달력 컨트롤러 API")
public class CalendarController {
	
	@Autowired
	CalendarService calendarService;
	
	@GetMapping("/list")
	@ApiOperation(value = "달력 내용 조회", notes = "달력의 한 달 기록을 조회한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "달력 내용 조회 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> expertInfoDetail(@RequestParam int userSeq, @RequestParam String date) {
		HashMap<String, JSONObject> result = null;
		try {
			result = calendarService.getCalendarMonthRecord(userSeq, date);
		}
		catch (NotExistsExpertException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "Member 테이블에서 회원 정보를 조회할 수 없습니다."));
		}
		catch(WrongDateException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 날짜 양식입니다. YYYY-MM 형식으로 입력해주세요."));
		}
		
		return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "달력의 한 달 기록 조회 성공", result));
	}
}
