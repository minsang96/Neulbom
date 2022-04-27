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
	@ApiModelProperty(example = "0", value="0: 일반회원, 1: 전문가")
	private String type;

	private String email;
	
	private String pwd;

	private String name;

	private String img;

	private String desc;

	private String[] career;
}
