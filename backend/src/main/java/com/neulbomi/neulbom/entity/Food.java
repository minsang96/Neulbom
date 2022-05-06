package com.neulbomi.neulbom.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "food")
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 파라미터가 없는 기본 생성자를 생성한다. 접근 권한을 설정하여 어느 곳에서나 객체를 생성할 수 있는 상황을 막는다.
@Getter
@Setter
@ToString
@AllArgsConstructor
public class Food {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // PK, Auto_Increment로 설정해서 직접 할당 방식이 아니라, 자동으로 생성되도록 하기 위한 어노테이션
	@Column(name = "food_seq")
	private long foodSeq;

	@Column(name = "food_code")
	private String foodCode;

	@Column(name = "food_name")
	private String foodName;

	@Column(name = "food_amount")
	private int foodAmount;

	@Column(name = "food_kcal")
	private Double foodKcal;
	
	@Column(name = "food_carbohydrate")
	private Double foodCarbohydrate;
	
	@Column(name = "food_sugars")
	private Double foodSugars;
	
	@Column(name = "food_fat")
	private Double foodFat;
	
	@Column(name = "food_protein")
	private Double foodProtein;
	
	@Column(name = "food_calcium")
	private Double foodCalcium;
	
	@Column(name = "food_phosphorus")
	private Double foodPhosphorus;
	
	@Column(name = "food_natrium")
	private Double foodNatrium;
	
	@Column(name = "food_kalium")
	private Double foodKalium;
	
	@Column(name = "food_magnesium")
	private Double foodMagnesium;
	
	@Column(name = "food_iron")
	private Double foodIron;
	
	@Column(name = "food_zinc")
	private Double foodZinc;
	
	@Column(name = "food_cholesterol")
	private Double foodCholesterol;
	
	@Column(name = "food_transfat")
	private Double foodTransfat;
	
	@Column(name = "del_yn")
	private String delYn;

	@Column(name = "reg_email")
	private String regEmail;

	@Column(name = "reg_dt")
	private String regDt;

	@Column(name = "mod_email")
	private String modEmail;

	@Column(name = "mod_dt")
	private String modDt;

}
