package com.neulbomi.neulbom.response;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("AdvancedResponseBody")
public class AdvancedResponseBody<T> extends BaseResponseBody {
	T data;

	public static <T> AdvancedResponseBody of(Integer statusCode, String message, T data) {
		return AdvancedResponseBody.builder().message(message).statusCode(statusCode).data(data).build();
	}

	@Builder
	public AdvancedResponseBody(Integer statusCode, String message, T data) {
		super(statusCode, message);
		this.data = data;
	}
}
