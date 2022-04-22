package com.neulbomi.neulbom.response;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("BaseResponseBody")
public class BaseResponseBody {
	String message = null;
	Integer statusCode = null;

	public BaseResponseBody(Integer statusCode) {
		this.statusCode = statusCode;
	}

	public BaseResponseBody(Integer statusCode, String message) {
		this.statusCode = statusCode;
		this.message = message;
	}

	public static BaseResponseBody of(Integer statusCode, String message) {
		BaseResponseBody body = new BaseResponseBody();
		body.message = message;
		body.statusCode = statusCode;
		return body;
	}
}