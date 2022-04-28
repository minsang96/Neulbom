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
public class CareerModifyDto {

	@ApiModelProperty(example = "1", value = "커리어 시퀀스")
	private long careerSeq;
	
	@ApiModelProperty(example = "싸피 병원 근무", value = "이력 내용")
	private String careerContent;
}
