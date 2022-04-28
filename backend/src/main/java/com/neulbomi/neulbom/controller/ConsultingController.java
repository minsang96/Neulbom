package com.neulbomi.neulbom.controller;

import java.util.LinkedList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.response.AdvancedResponseBody;
import com.neulbomi.neulbom.response.BaseResponseBody;
import com.neulbomi.neulbom.service.ConsultingService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/consulting")
@Api("전문가 상담 API")
public class ConsultingController {

	@Autowired
	private ConsultingService consultingService;

	@GetMapping("/expert")
	@ApiOperation(value = "전문가 목록", notes = "전문가 목록을 반환한다.")
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "전문가 목록 반환 성공"),
			  @ApiResponse(code = 409, message = "조회 과정에서 발생하는 오류"),
			  @ApiResponse(code = 500, message = "서버 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> expertList() {
		try {
			LinkedList<Object> result = consultingService.getInfo();
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "조회 성공", result));
		} catch (NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없음"));
		}
	}

}
