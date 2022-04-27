package com.neulbomi.neulbom.dto;

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
public class MemberSingInDto {
	private String userType;
	private String userEmail;
	private String userPwd;
	private String memberNickname;
	private String memberImg;
	private int memberHeight;
	private int memberWeight;
	private int memberYear;
	private String memberGender;
	private String memberDesc;
}
