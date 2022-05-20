package com.neulbomi.neulbom.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.neulbomi.neulbom.exception.EmptyFileException;
import com.neulbomi.neulbom.exception.FileUploadFailedException;
import com.neulbomi.neulbom.response.AdvancedResponseBody;
import com.neulbomi.neulbom.response.BaseResponseBody;
import com.neulbomi.neulbom.service.AwsS3Service;
import com.neulbomi.neulbom.service.FoodCodeService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/foodcode")
public class FoodCodeController {
	
	@Autowired
	FoodCodeService fcService;
	
	@GetMapping("/input")
	public ResponseEntity<? extends BaseResponseBody> input()  {
		fcService.inputFoodCode();
			return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "입력 성공"));

	}
}
