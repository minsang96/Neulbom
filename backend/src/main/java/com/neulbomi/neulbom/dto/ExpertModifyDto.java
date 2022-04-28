package com.neulbomi.neulbom.dto;

import java.util.ArrayList;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@ApiModel(value="전문가 회원 정보 수정 DTO")
public class ExpertModifyDto {
	@ApiModelProperty(example="1",value="유저 시퀀스")
	private int userSeq;
	 
	@ApiModelProperty(example = "건강한 식습관 만들어요.", value = "전문가 한 줄 소개")
	private String desc;

	@ApiModelProperty(example = "{\r\n" + 
			"  \"career\": [\r\n" + 
			"    {\r\n" + 
			"       \"careerSeq\":5,\r\n" + 
			"        \"careerContent\":\"싸피 병원 수정 테스트\"\r\n" + 
			"    },\r\n" + 
			"    {\r\n" + 
			"       \"careerSeq\":0,\r\n" + 
			"        \"careerContent\":\"새로 추가되는 이력은 careerSeq 0으로 보내주세요!\"\r\n" + 
			"    }\r\n" + 
			"  ],\r\n" + 
			"}", value = "전문가 한 줄 소개")
	private ArrayList<CareerModifyDto> career;
	
}
