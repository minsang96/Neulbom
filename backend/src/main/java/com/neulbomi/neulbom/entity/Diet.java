package com.neulbomi.neulbom.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "diet")
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 파라미터가 없는 기본 생성자를 생성한다. 접근 권한을 설정하여 어느 곳에서나 객체를 생성할 수 있는 상황을 막는다.
@Getter
@Setter
@ToString
public class Diet {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // PK, Auto_Increment로 설정해서 직접 할당 방식이 아니라, 자동으로 생성되도록 하기 위한
														// 어노테이션
	@Column(name = "diet_seq")
	private long dietSeq;

	@Column(name = "user_seq")
	private int userSeq;

	@Column(name = "diet_time")
	private String dietTime;

	@Column(name = "food_code")
	private String foodCode;

	@Column(name = "diet_img")
	private String dietImg;

	@Column(name = "diet_amount")
	private int dietAmount;

	@Column(name = "diet_date")
	private String dietDate;

	@Column(name = "del_yn")
	private String delYn = "n";

	@Column(name = "reg_email")
	private String regEmail;

	@Column(name = "reg_dt")
	private String regDt;

	@Column(name = "mod_email")
	private String modEmail;

	@Column(name = "mod_dt")
	private String modDt;

	@Builder
	public Diet(long dietSeq, int userSeq, String dietTime, String foodCode, String dietImg, int dietAmount, String delYn,
			String dietDate, String regEmail, String regDt, String modEmail, String modDt) {
		super();
		this.dietSeq = dietSeq;
		this.userSeq = userSeq;
		this.dietTime = dietTime;
		this.foodCode = foodCode;
		this.dietImg = dietImg;
		this.dietAmount = dietAmount;
		this.dietDate = dietDate;
		this.delYn = delYn;
		this.regEmail = regEmail;
		this.regDt = regDt;
		this.modEmail = modEmail;
		this.modDt = modDt;
	}

}
