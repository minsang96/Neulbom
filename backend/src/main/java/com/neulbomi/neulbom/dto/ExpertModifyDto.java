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

	@ApiModelProperty(example = "['싸피 병원 근무', '싸피 보건소 근무']", value = "새로운 이력")
	private String[] career;
	
	@ApiModelProperty(example = "https://neulbom-s3-bucket.s3.ap-northeast-2.amazonaws.com/Diet/1_profile_1651197572906.jpg", value = "사진 url")
	private String expertImg;
	
}
