package com.neulbomi.neulbom.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.neulbomi.neulbom.service.ReportService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/report")
@Api("리포트")
public class ReportController {

	private static final String FAIL = "fail";

	@Autowired
	private ReportService reportService;

	@GetMapping("/daily/bloodsugar")
	@ApiOperation(value = "일간 혈당값 추세", notes = "유저 시퀀스와 날짜를 입력 받아 당일, 전날 혈당 값을 반환한다.")
	@ApiImplicitParams({ @ApiImplicitParam(name = "userSeq", value = "유저 시퀀스", required = true),
						 @ApiImplicitParam(name = "date", value = "yyyy-mm-dd", required = true) })
	public ResponseEntity<Object> dailyBS(@RequestParam(name = "userSeq") int userSeq,
										  @RequestParam(name = "date") String date) {
		
		Map<String, Object> result = reportService.readBS(userSeq, date);
		if(result != null)
			return new ResponseEntity<>(result, HttpStatus.OK);
		
		return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);

	}

}
