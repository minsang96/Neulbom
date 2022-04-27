package com.neulbomi.neulbom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neulbomi.neulbom.dto.MemberSingInDto;
import com.neulbomi.neulbom.exception.ExistsUserEmailException;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.response.BaseResponseBody;
import com.neulbomi.neulbom.service.MemberService;
import com.neulbomi.neulbom.util.TimeUtils;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/member")
@Api("일반 회원 컨트롤러 API")

public class MemberController {
	
	@Autowired
	private MemberService memberService;
	
	@PostMapping("/join")
	@ApiOperation(value = "일반회원 회원가입", notes = "사용자가 입력한 일반 회원정보를 등록한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 201, message = "회원가입 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류"),
			  @ApiResponse(code = 409, message = "가입하려는 이메일이 중복되는 경우 발생하는 오류"),
			  @ApiResponse(code = 202, message = "User 테이블에서 사용자를 찾을 수 없는 경우 발생하는 오류"),
			})
	public ResponseEntity<? extends BaseResponseBody> regist(@RequestBody MemberSingInDto memberSignInDto) {
		
		try {
			memberService.signIn(memberSignInDto);
		}
		catch(ExistsUserEmailException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "이미 해당 이메일로 가입된 계정이 있습니다."));
		}
		catch(NotExistsUserException e) {
			return ResponseEntity.status(202).body(BaseResponseBody.of(202, "User 테이블에서 계정 정보를 조회할 수 없습니다."));
		}
		
		return ResponseEntity.status(201).body(BaseResponseBody.of(201, "회원가입 성공"));
	}
}
