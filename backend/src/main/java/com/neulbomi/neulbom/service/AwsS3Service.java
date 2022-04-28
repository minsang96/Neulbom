package com.neulbomi.neulbom.service;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.neulbomi.neulbom.exception.EmptyFileException;
import com.neulbomi.neulbom.exception.FileUploadFailedException;
import com.neulbomi.neulbom.response.BaseResponseBody;
import com.neulbomi.neulbom.util.CommonUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class AwsS3Service {

	private final AmazonS3Client amazonS3Client;

	// application properties에서 버킷 이름 가져옴
	@Value("${cloud.aws.s3.bucket}")
	private String bucketName;

	public String uploadFileV1(String category, int userSeq, MultipartFile multipartFile) {
		// 파일이 제대로 업로드 된 것인지 확인
		validateFileExists(multipartFile);

		// 파일 이름 지정 - userSeq
		String fileName = CommonUtils.buildFileName(category, userSeq, multipartFile.getOriginalFilename());

		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentType(multipartFile.getContentType());

		try (InputStream inputStream = multipartFile.getInputStream()) {
			amazonS3Client
					.putObject(new PutObjectRequest(bucketName, fileName, inputStream, objectMetadata)
							.withCannedAcl(CannedAccessControlList.PublicRead));
		} catch (IOException e) {
			// 파일 업로드 실패
			throw new FileUploadFailedException();
		}

		// S3에 업로드 된 사진의 URL 반환
		return amazonS3Client.getUrl(bucketName, fileName).toString();
	}

	private void validateFileExists(MultipartFile multipartFile) {
		if (multipartFile.isEmpty()) {
			// 유효하지 않은 파일
			throw new EmptyFileException();
		}
	}

}