package com.neulbomi.neulbom.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/s3")
@Api("S3 컨트롤러 API")
public class S3Controller {
	@Autowired
    AwsS3Service awsS3Service;
	
	@PostMapping("/upload")
	@ApiOperation(value = "s3 사진 업로드", notes = "s3에 이미지 업로드", response = BaseResponseBody.class)
	@ApiResponses({ @ApiResponse(code = 200, message = "s3에 이미지 업로드 성공"),
					@ApiResponse(code = 409, message = "파일 업로드에 실패했습니다."),
					@ApiResponse(code = 415, message = "유효하지 않은 파일입니다."),
					@ApiResponse(code = 500, message = "서버 오류"), })
	public ResponseEntity<? extends BaseResponseBody> upload(@RequestPart(value = "file") ArrayList<MultipartFile> multipartFileList, @RequestParam int userSeq, @RequestParam @ApiParam(value = "Profile : 프로필 사진, Diet : 음식 사진") String category) {
		String[] url = new String[multipartFileList.size()];
		try {
			url = awsS3Service.uploadFileV1(category, userSeq, multipartFileList);
		} catch (EmptyFileException e) {
			return ResponseEntity.status(415).body(BaseResponseBody.of(415, "유효하지 않은 파일입니다."));
		} catch (FileUploadFailedException e) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "파일 업로드에 실패했습니다."));
		}
		return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "파일 업로드에 성공했습니다.", url));
	}
}
