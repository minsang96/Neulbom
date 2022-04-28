package com.neulbomi.neulbom.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neulbomi.neulbom.dto.LoginDto;
import com.neulbomi.neulbom.entity.User;
import com.neulbomi.neulbom.exception.NotExistsUserException;
import com.neulbomi.neulbom.response.AdvancedResponseBody;
import com.neulbomi.neulbom.response.BaseResponseBody;
import com.neulbomi.neulbom.service.UserService;
import com.neulbomi.neulbom.util.JwtTokenProvider;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/user")
@Api("유저 컨트롤러 API")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "입력한 이메일과 비밀번호로 로그인을 진행하고, accessToken을 반환한다.", response = BaseResponseBody.class)
	@ApiResponses(
			{ @ApiResponse(code = 200, message = "로그인 성공"),
			  @ApiResponse(code = 400, message = "잘못된 요청입니다."),
			  @ApiResponse(code = 500, message = "서버 오류"),
			  @ApiResponse(code = 202, message = "가입된 회원 정보가 없습니다."),
			  @ApiResponse(code = 206, message = "비밀 번호가 일치하지 않습니다.")
			})
	public ResponseEntity<? extends BaseResponseBody> login(@RequestBody LoginDto loginDto) {
		try {
			User user = userService.getUserByEmail(loginDto.getUserEmail());
	        if (!passwordEncoder.matches(loginDto.getUserPwd(), user.getUserPwd())) {
	            throw new IllegalArgumentException();
	        }
	        List<String> auth = new ArrayList<>();
	        auth.add("ROLE_USER");
	        return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "로그인 성공", jwtTokenProvider.createToken(user.getUserEmail(),auth)));
		}
		catch(NotExistsUserException e) {
			return ResponseEntity.status(202).body(AdvancedResponseBody.of(202, "가입 정보가 없습니다.", ""));
		}
		catch(IllegalArgumentException e) {
			return ResponseEntity.status(206).body(AdvancedResponseBody.of(206, "패스워드를 확인해주세요.", ""));
		}
	}
}
