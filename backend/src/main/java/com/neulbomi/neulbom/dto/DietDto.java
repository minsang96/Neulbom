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
public class DietDto {

	@ApiModelProperty(example = "1", value = "유저 시퀀스")
	private int userSeq;

	@ApiModelProperty(example = "breakfast", value = "breakfast/lunch/dinner")
	private String dietTime;

	@ApiModelProperty(example = "1011001", value = "1011001 : 쌀밥")
	private String foodCode;

	@ApiModelProperty(example = "300", value = "음식 중량(g)")
	private int foodAmount;

	@ApiModelProperty(example = "2022-04-28", value = "기록할 식단의 날짜")
	private String dietDate;
	
	@ApiModelProperty(example = "https://neulbom-s3-bucket.s3.ap-northeast-2.amazonaws.com/Diet/1_%EB%B9%99%EC%88%98_1651126588984.jpg", value = "기록할 식단의 사진 url")
	private String dietImg;

}