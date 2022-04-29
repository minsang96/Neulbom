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
@ApiModel(value="혈당 DTO")
public class BloodSugarDto {
	@ApiModelProperty(example="14", value="유저 시퀀스")
	private int userSeq;
	@ApiModelProperty(example="2022-04-28", value="측정날짜, YYYY-MM-DD")
	private String bsDate;
	@ApiModelProperty(example="100", value="혈당 수치")
	private int bsLevel;
	@ApiModelProperty(example="16:42", value="측정 시간, HH:MM")
	private String bsTime;
	@ApiModelProperty(example="afterBreakfast", value="측정 시간 공통 코드")
	private String bsCode;
}
