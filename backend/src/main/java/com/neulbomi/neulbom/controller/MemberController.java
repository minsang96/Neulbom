package com.neulbomi.neulbom.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.neulbomi.neulbom.dto.EmailDto;
import com.neulbomi.neulbom.dto.MemberDto;
import com.neulbomi.neulbom.dto.MemberModifyDto;
import com.neulbomi.neulbom.exception.ExistsUserEmailException;
import com.neulbomi.neulbom.exception.NotExistsSettingException;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.repository.UserRepository;
import com.neulbomi.neulbom.response.AdvancedResponseBody;
import com.neulbomi.neulbom.response.BaseResponseBody;
import com.neulbomi.neulbom.service.MailService;
import com.neulbomi.neulbom.service.MemberService;
import com.neulbomi.neulbom.service.UserService;
import com.neulbomi.neulbom.util.JwtTokenProvider;
import com.neulbomi.neulbom.util.MailContentBuilder;
import com.neulbomi.neulbom.util.TimeUtils;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/member")
@Api("일반 회원 컨트롤러 API")

public class MemberController {
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private MailService mailService;
	
	@Autowired
	private MailContentBuilder mailContentBuilder;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/join")
	@ApiOperation(value = "일반회원 회원가입", notes = "사용자가 입력한 일반 회원정보를 등록한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 201, message = "회원가입 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류"),
			  @ApiResponse(code = 409, message = "가입 과정에서 발생하는 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> regist(@RequestBody MemberDto memberDto) {		
		try {
			memberService.signIn(memberDto);
		}
		catch(ExistsUserEmailException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "이미 해당 이메일로 가입된 계정이 있습니다."));
		}
		catch(NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "User 테이블에서 계정 정보를 조회할 수 없습니다."));
		}
		catch(NotExistsSettingException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "설정 인자값은 bloodPressure, bloodSugar 중 1개여야만 합니다."));
		}
		return ResponseEntity.status(201).body(BaseResponseBody.of(201, "회원가입 성공"));
	}
	
	@PostMapping("/modify")
	@ApiOperation(value = "일반회원 회원 정보 수정", notes = "해당 유저 시퀀스를 가진 회원의 정보를 수정한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 201, message = "회원정보 수정 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류"),
			  @ApiResponse(code = 409, message = "수정 과정에서 발생하는 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> modify(@RequestHeader String Authorization,
			@RequestBody MemberModifyDto memberModifyDto) {
		
		try {
			if(!userService.getUserByUserSeq(memberModifyDto.getUserSeq()).getUserEmail().equals(jwtTokenProvider.getUserPk(Authorization)))
				return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 토큰입니다."));
			memberService.modify(memberModifyDto);
		}
		catch(NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없습니다."));
		}
		catch(NotExistsSettingException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "설정 정보를 조회할 수 없습니다."));
		}
		
		return ResponseEntity.status(201).body(BaseResponseBody.of(201, "회원정보 수정 성공"));
	}
	
	@GetMapping("/info")
	@ApiOperation(value = "일반회원 회원 정보 조회", notes = "해당 유저 시퀀스를 가진 회원의 정보를 조회한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "회원정보 조회 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류"),
			  @ApiResponse(code = 409, message = "조회 과정에서 발생하는 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> getInfo(@RequestHeader String Authorization,
			@RequestParam int userSeq) {
		
		try {
			if(!userService.getUserByUserSeq(userSeq).getUserEmail().equals(jwtTokenProvider.getUserPk(Authorization)))
				return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 토큰입니다."));
			Map<String, Object> result = memberService.getInfo(userSeq);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "회원정보 조회 성공",result));
		}
		catch(NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없습니다."));
		}
		catch(NotExistsSettingException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "설정 정보를 조회할 수 없습니다."));
		}
		
	}
	
	@GetMapping("/setting")
	@ApiOperation(value = "혈당, 혈압 선택 여부 조회", notes = "해당 유저 시퀀스를 가진 회원의 혈당,혈압 선택여부를 조회한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "선택여부 조회 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류"),
			  @ApiResponse(code = 409, message = "조회 과정에서 발생하는 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> getBloodInfo(@RequestParam int userSeq) {
		
		try {
			Map<String, Object> result = memberService.getBloodInfo(userSeq);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "선택여부 조회 성공",result));
		}
		catch(NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없습니다."));
		}
	}
	
	@GetMapping("/chat")
	@ApiOperation(value = "채팅창에서 보여질 일반회원 기본 정보 조회", notes = "해당 유저 시퀀스를 가진 회원의 기본정보를 조회한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "기본정보 조회 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류"),
			  @ApiResponse(code = 409, message = "조회 과정에서 발생하는 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> getChatInfo(@RequestParam int userSeq) {
		
		try {
			Map<String, Object> result = memberService.getChatInfo(userSeq);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "기본정보 조회 성공",result));
		}
		catch(NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없습니다."));
		}
	}
	
	@GetMapping("/email/certified")
	@ApiOperation(value = "이메일 인증 코드 생성", notes = "이메일 인증코드를 생성하고, 사용자가 입력한 이메일로 이메일 인증코드를 보낸다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "이메일 인증 코드 생성 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> emailCertify(@RequestParam String email) {
		Map<String, String> result = new HashMap<>();
		
		String certKey = mailService.generateKey();
		String message = mailContentBuilder.certBuild(certKey);
		mailService.sendCertMail(new EmailDto(email, "[늘봄] 이메일 인증", message));
		
		result.put("certKey", certKey);
		
		return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "인증 코드 발급 성공", certKey));
	}
}
