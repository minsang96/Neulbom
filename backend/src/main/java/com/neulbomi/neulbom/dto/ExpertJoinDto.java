package com.neulbomi.neulbom.dto;

import org.springframework.stereotype.Service;

import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Service
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@AllArgsConstructor
public class ExpertJoinDto {
	@ApiModelProperty(example = "1", value = "0: 일반회원, 1: 전문가")
	private String type;

	@ApiModelProperty(example = "freessafy104@gmail.com", value = "사용자 이메일")
	private String email;

	@ApiModelProperty(example = "password", value = "유저 비밀번호")
	private String pwd;

	@ApiModelProperty(example = "김의사", value = "전문가 유저 이름")
	private String name;

	@ApiModelProperty(example = "profile.jpg", value = "프로필 사진 파일")
	private String img;

	@ApiModelProperty(example = "건강한 식습관 만들어요.", value = "전문가 한 줄 소개")
	private String desc;

	@ApiModelProperty(example = "[\"싸피 보건소\", \"싸피 병원\"]", value = "전문가 한 줄 소개")
	private String[] career;
}
