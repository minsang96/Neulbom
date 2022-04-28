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
@ApiModel(value="회원 정보 수정 DTO")
public class MemberModifyDto {
	@ApiModelProperty(example="1",value="유저 시퀀스")
	private int userSeq;
	 
	@ApiModelProperty(example="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f331.svg",value="프로필 사진 링크")
	private String img;
	
	@ApiModelProperty(example="170", value="키(cm)")
	private int height;
	
	@ApiModelProperty(example="55", value="몸무게(kg)")
	private int weight;
	
	@ApiModelProperty(example="고혈압,당뇨", value="질병")
	private String desc;
	
	@ApiModelProperty(value="bloodPressure: 혈압, bloodSugar: 혈당")
	private String[] setting;
}
