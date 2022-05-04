package com.neulbomi.neulbom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.neulbomi.neulbom.dto.OtherDto;
import com.neulbomi.neulbom.exception.NotExistsRecordException;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.exception.WrongCommonCodeException;
import com.neulbomi.neulbom.exception.WrongDateException;
import com.neulbomi.neulbom.exception.WrongTimeException;
import com.neulbomi.neulbom.response.BaseResponseBody;
import com.neulbomi.neulbom.service.OtherService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/other")
@Api("술,커피,운동 기록 컨트롤러 API")
public class OhterController {
	
	@Autowired
	OtherService otherService;
	
	@PostMapping("/add")
	@ApiOperation(value = "술,커피,운동 기록 추가", notes = "사용자의 술,커피,운동 기록을 등록한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 201, message = "기록 등록 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류"),
			  @ApiResponse(code = 409, message = "등록 과정에서 발생하는 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> addRecord(@RequestBody OtherDto otherDto) {		
		try {
			otherService.addRecord(otherDto);
			return ResponseEntity.status(201).body(BaseResponseBody.of(201, "기록 등록 성공"));
		}
		catch(NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "User 테이블에서 계정 정보를 조회할 수 없습니다."));
		}
		catch(WrongCommonCodeException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "code값이 alcohol, coffee, exercise 이외의 값입니다."));
		}
		catch(WrongDateException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 날짜 양식입니다. YYYY-MM-DD 형식으로 입력해주세요."));
		}
		catch(WrongTimeException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 시간 양식입니다. HH:MM 형식으로 입력해주세요."));
		}
	}
	
	@GetMapping("/delete")
	@ApiOperation(value = "술,커피,운동 기록 삭제", notes = "사용자의 술,커피,운동 기록을 삭제한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "기록 삭제 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류"),
			  @ApiResponse(code = 409, message = "삭제 과정에서 발생하는 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> deleteRecord(@RequestParam long otherSeq) {		
		try {
			otherService.deleteRecord(otherSeq);
			return ResponseEntity.status(201).body(BaseResponseBody.of(200, "기록 삭제 성공"));
		}
		catch(NotExistsRecordException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 시퀀스 입니다."));
		}
	}
}
