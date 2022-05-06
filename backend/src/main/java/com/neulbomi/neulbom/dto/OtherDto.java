package com.neulbomi.neulbom.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
@Builder
@ApiModel(value="기타(술,커피,운동) DTO")
public class OtherDto {
	@ApiModelProperty(example="exercise", value="술,커피,운동 코드")
	private String code;
	@ApiModelProperty(example="14", value="유저 시퀀스")
	private int userSeq;
	@ApiModelProperty(example="2022-05-04", value="기록날짜, YYYY-MM-DD")
	private String otherDate;
	@ApiModelProperty(example="13:22", value="기록 시간, HH:MM")
	private String otherTime;
}
