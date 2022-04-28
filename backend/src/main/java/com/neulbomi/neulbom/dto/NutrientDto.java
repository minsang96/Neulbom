package com.neulbomi.neulbom.dto;

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
@Builder
@ToString
public class NutrientDto {
	private int totalKcal;
	private double carbohydrate;
	private double protein;
	private double fat;
	private double sugars;
	private double natirum;
}
