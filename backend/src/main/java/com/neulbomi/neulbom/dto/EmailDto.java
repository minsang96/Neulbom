package com.neulbomi.neulbom.dto;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Service
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class EmailDto {
	private String recipient;
	private String subject;
	private String body;

}
