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
	
	@ApiModelProperty(example = "https://neulbom-s3-bucket.s3.ap-northeast-2.amazonaws.com/Diet/1_%EB%B9%99%EC%88%98_1651126588984.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaDmFwLW5vcnRoZWFzdC0yIkcwRQIgPzK%2BuBW%2Bxj3DLNwe6Fd%2BvIVAz3yj2O3HsX5ziNi3KGUCIQDqt63rrlqvJ3MzJu%2FlOsoEFeCdf%2FEtac8cor6CF6%2BBLCrtAgjj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDkwODQ2ODEzMzg5NiIM6htSUYM1jp8irHgQKsECX1NlspCyqsRPeUt0Jh%2FO%2BRS64akNLBpYl9w6pNgEcuAeqiJBTfW8hhx58G9uMEiN7HQdAAIYNMUUfKN3TX8s0JPX1Kp1nNXaLUXJdP2%2FBdpxKCrSbKTDtujQe9p6KmbF4MqJlCvKBGoitFxRB99zYUa%2BCDZXm9XJJLFeH9p6pJU266g12e5JyzMK8JXH3WTdhlqFzhW2lUQfiy2M7bUeZfF3ZQlJcua8PvwOEZj7GxwE0Z7ujSTJcqsuJLYUgfZmguF8eqTTatoH5WjaADO4RlF3vpQ%2FysH1BjVhnndxhxIruA85mCBg%2Bk5pXShCWjmJlP7j3cTcG1I5It3Xv2G2Cb1xVm4tftkntuKAwmqOJqcKSwB%2FjojsjroUbve3GzakBHp530XXgKwPaDmUc6E8Z2f5sUMRaIVuLGhSS8hBJFyNMOT%2FrJMGOrMCOwNWB5X2yQMvAKcIk9VWbcaDqWZo93Y9oAibvuHxKC5HWVTrQ4pvwcSK3xg5M%2Bs7jjK9Tkg4I3DrZSAtglZzZnDCCSB4yjpqajWRYZvClpDHpcw%2FgIlJPDd0ZIUXvyKMW8Bm1Wqndo%2FCDA%2By5n87BhCcjtxNnMH6HQ4Z1ZUn68%2Bb5Xp5b4smMSvtZRerlqitJBqt1nNfU7zDaBEL4K0ct1Kb3OwgFDz%2FWnXKHVtaiS5HKplo1ezTT7MbaSpN1Si4H6uaqrNaEOuLSb29Ln1GVvgE1yP5Ig1BeQ19hyiiHL1SGiqD6LRLAZB6x6ld3RAYnzgvkarfFV8ncskfJ%2FmMfoGuGo36UZLs%2Bsu6yamw5yNRNESzR1SoKtDa5hsgrwTR6%2BQyWpuhA39vHz%2FfcN6BWoLDJA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220429T013212Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA5HBHLUAEMSAOVCOK%2F20220429%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=b0a901d68c1cae37a09e17e68ddd150bc2cca57e81e675d47c646432683be8a5", value = "기록할 식단의 사진 url")
	private String dietImg;

}