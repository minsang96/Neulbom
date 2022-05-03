package com.neulbomi.neulbom.util;

public class CommonUtils {
	private static final String FILE_EXTENSION_SEPARATOR = ".";
	private static final String SEPARATOR ="_";
	
	// 파일 이름 지정
	public static String buildFileName(String category, int userSeq, String originalFileName) {
	    int fileExtensionIndex = originalFileName.lastIndexOf(FILE_EXTENSION_SEPARATOR);
	    
	    // 파일 확장자
	    String fileExtension = originalFileName.substring(fileExtensionIndex);
	    
	    // 파일 원본 이름
	    String fileName = originalFileName.substring(0, fileExtensionIndex);
	    
	    // 현재 시간
	    String now = String.valueOf(System.currentTimeMillis());

	    return category + "/" + userSeq + SEPARATOR + fileName + SEPARATOR + now + fileExtension;
	    // 카테고리(사용자 시퀀스)_원본파일이름_시간_원본파일확장자
	    // ex: Profile/1_profile_1651113098522.jpg
	  }
}
