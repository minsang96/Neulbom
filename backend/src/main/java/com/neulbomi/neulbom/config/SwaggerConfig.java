package com.neulbomi.neulbom.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.common.base.Predicates;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	@Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
        		// Swagger API 문서에 대한 설명 표기 메소드 (선택)
        		.apiInfo(apiInfo())
        		.select()
        		// Swagger API 문서로 만들기 원하는 BasePackage(필수)
                .apis(Predicates.not(RequestHandlerSelectors.basePackage("org.springframework.boot"))) 
                // 해당 URL에 해당하는 요청만 Swagger API 문서로
                .paths(PathSelectors.any())
                .build();
    }

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder()
				.title("늘봄 API")
				.description("늘봄 API 명세서")
				.version("1.0")
				.contact(new Contact("[NeulBom Swagger]", "https://lab.ssafy.com/s06-final/S06P31A104", null))
				.build();
	}
}
