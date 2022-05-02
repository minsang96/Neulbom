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
@ApiModel(value="혈압 DTO")
public class BloodPressureDto {
	@ApiModelProperty(example="14", value="유저 시퀀스")
	private int userSeq;
	@ApiModelProperty(example="2022-04-29", value="측정날짜, YYYY-MM-DD")
	private String bpDate;
	@ApiModelProperty(example="120", value="혈당 수치")
	private int bpHigh;
	@ApiModelProperty(example="80", value="혈당 수치")
	private int bpLow;
	@ApiModelProperty(example="15:42", value="측정 시간, HH:MM")
	private String bpTime;
	@ApiModelProperty(example="afterBreakfast", value="측정 시간 공통 코드")
	private String bpCode;
}
