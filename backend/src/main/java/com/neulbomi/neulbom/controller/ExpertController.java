package com.neulbomi.neulbom.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.neulbomi.neulbom.dto.EmailDto;
import com.neulbomi.neulbom.dto.ExpertJoinDto;
import com.neulbomi.neulbom.dto.ExpertModifyDto;
import com.neulbomi.neulbom.entity.Expert;
import com.neulbomi.neulbom.entity.User;
import com.neulbomi.neulbom.exception.ExistsUserEmailException;
import com.neulbomi.neulbom.exception.NotExistsExpertException;
import com.neulbomi.neulbom.exception.NotExistsImgException;
import com.neulbomi.neulbom.exception.NotExistsSettingException;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.response.AdvancedResponseBody;
import com.neulbomi.neulbom.response.BaseResponseBody;
import com.neulbomi.neulbom.service.ExpertService;
import com.neulbomi.neulbom.service.MailService;
import com.neulbomi.neulbom.service.UserService;
import com.neulbomi.neulbom.util.JwtTokenProvider;
import com.neulbomi.neulbom.util.MailContentBuilder;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/expert")
@Api("전문가 컨트롤러 API")
public class ExpertController {
	
	@Autowired
	private ExpertService expertService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@Autowired
	private MailService mailService;
	
	@Autowired
	private MailContentBuilder mailContentBuilder;
	
	@PostMapping("/join")
	@ApiOperation(value = "회원가입", notes = "사용자가 입력한 회원정보를 등록한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "회원가입 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류"), 
			  @ApiResponse(code = 409, message = "이미 가입된 이메일로 가입할 때 발생하는 오류"),
			})
	public ResponseEntity<? extends BaseResponseBody> join(@RequestBody ExpertJoinDto expertJoinDto) {
		
		try {
			expertService.join(expertJoinDto);
		} catch (ExistsUserEmailException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "이미 가입된 이메일입니다."));
		} 
		catch (NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "User 테이블에서 계정 정보를 조회할 수 없습니다."));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "회원가입 성공"));
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
	
	@PostMapping("/certImg")
	@ApiOperation(value = "전문가 자격 사진 전송", notes = "전문가가 업로드 한 자격증 사진을 관리자 메일에 보낸다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "전문가 자격 인증 요청 메일 전송 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 409, message = "업로드 된 사진이 없습니다."),
			  @ApiResponse(code = 550, message = "메일 전송에 실패했습니다."),
			  @ApiResponse(code = 500, message = "서버 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> sendExpertCertImg(@RequestParam String email, @RequestParam MultipartFile certImg) {
		// 전문가 찾기
		User user = userService.getUserByEmail(email);
		if(user == null) return ResponseEntity.status(409).body(BaseResponseBody.of(409, "User 테이블에서 계정 정보를 조회할 수 없습니다."));
			
		Expert expert = expertService.getExpertByUserSeq(user.getUserSeq());
		if(expert == null) return ResponseEntity.status(409).body(BaseResponseBody.of(409, "Expert 테이블에서 사용자 정보를 조회할 수 없습니다."));
		
		try {
			String message = mailContentBuilder.expertCertBuild(expert.getExpertName(), email);
			mailService.sendExpertCertMail(new EmailDto(email, "[늘봄] 전문가 자격 인증 요청", message, certImg));
		} catch (NotExistsImgException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "업로드 된 사진이 없습니다."));
		} catch (MailException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(550, "메일 전송에 실패했습니다."));
		}
		
		return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "전문가 자격 인증 요청 메일 전송 성공"));
	}
	
	@GetMapping("/detail")
	@ApiOperation(value = "전문가 상세 정보 조회", notes = "전문가의 전체 정보를 조회한다. (전문가 상세보기 페이지)", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "전문가의 전체 정보 조회 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> expertInfoDetail(@RequestParam int userSeq) {
		Map<String, Object> result = null;
		try {
			result = expertService.getExpertInfoDetail(userSeq);
		} catch (NotExistsExpertException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "Expert 테이블에서 전문가 정보를 조회할 수 없습니다."));
		}
		
		return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "전문가의 전체 정보 조회 성공", result));
	}
	
	@GetMapping("/chat")
	@ApiOperation(value = "전문가 기본 정보 조회", notes = "전문가의 기본 정보를 조회한다. (채팅방 상단)", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "전문가의 기본 정보 조회 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> expertInfoDefault(@RequestParam int userSeq) {
		Map<String, Object> result = null;
		try {
			result = expertService.getExpertInfoDefault(userSeq);
		} catch (NotExistsExpertException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "Expert 테이블에서 전문가 정보를 조회할 수 없습니다."));
		}
		
		return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "전문가의 기본 정보 조회 성공", result));
	}
	
	@GetMapping("/info")
	@ApiOperation(value = "전문가 회원 회원 정보 조회 (마이페이지)", notes = "해당 유저 시퀀스를 가진 회원의 정보를 조회한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "회원정보 조회 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류"),
			  @ApiResponse(code = 409, message = "조회 과정에서 발생하는 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> getInfo(@RequestHeader String Authorization, @RequestParam int userSeq) {
		try {
			if(!userService.getUserByUserSeq(userSeq).getUserEmail().equals(jwtTokenProvider.getUserPk(Authorization)))
				return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 토큰입니다."));
			Map<String, Object> result = expertService.getInfo(userSeq);
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "회원정보 조회 성공",result));
		}
		catch(NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없습니다."));
		}
	}
	
	@PostMapping("/modify")
	@ApiOperation(value = "전문가 회원 정보 수정", notes = "해당 유저 시퀀스를 가진 회원의 정보를 수정한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 201, message = "회원정보 수정 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류"),
			  @ApiResponse(code = 409, message = "수정 과정에서 발생하는 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> modify(@RequestHeader String Authorization,
			@RequestBody ExpertModifyDto expertModifyDto) {
		
		try {
			if(!userService.getUserByUserSeq(expertModifyDto.getUserSeq()).getUserEmail().equals(jwtTokenProvider.getUserPk(Authorization)))
				return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 토큰입니다."));
			expertService.modify(expertModifyDto);
		}
		catch(NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없습니다."));
		}
		catch(NotExistsSettingException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "설정 정보를 조회할 수 없습니다."));
		}
		
		return ResponseEntity.status(201).body(BaseResponseBody.of(200, "회원정보 수정 성공"));
	}
	
	@PostMapping("/remove/career")
	@ApiOperation(value = "전문가 회원 경력 삭제", notes = "해당 유저 시퀀스를 가진 회원의 경력들을 삭제한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 201, message = "경력 삭제 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류"),
			  @ApiResponse(code = 409, message = "삭제 과정에서 발생하는 오류")
			})
	public ResponseEntity<? extends BaseResponseBody> removeCareer(@RequestHeader String Authorization, @RequestParam int userSeq,
			@RequestBody long[] careerSeq) {
		
		try {
			if(!userService.getUserByUserSeq(userSeq).getUserEmail().equals(jwtTokenProvider.getUserPk(Authorization)))
				return ResponseEntity.status(409).body(BaseResponseBody.of(409, "잘못된 토큰입니다."));
			expertService.removeCareer(careerSeq);
		}
		catch(NotExistsUserException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "계정 정보를 조회할 수 없습니다."));
		}
		
		return ResponseEntity.status(201).body(BaseResponseBody.of(200, "전문가 경력 삭제 성공"));
	}
}
