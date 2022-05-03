package com.neulbomi.neulbom.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.neulbomi.neulbom.util.JwtAuthenticationFilter;
import com.neulbomi.neulbom.util.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	// 비밀번호 암호화
	// BCryptPasswordEncoder
	// : BCrypt라는 해시 함수를 이용하여 패스워드를 암호화하는 구현체
	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable()
			.cors().configurationSource(corsConfigurationSource())
			.and()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // jwt 인증, 세션 사용 안 함
			.and()
			.authorizeRequests()
			.mvcMatchers("/v2/**", "/configuration/**", "/swagger*/**", "/webjars/**", "/swagger-resources/**") // spring security랑 swagger 함께 사용하기
			.permitAll() 
			.antMatchers("/member/modify","/member/info").hasRole("USER")
			.antMatchers("/expert/modify","/expert/info","/expert/remove/career").hasRole("USER")
			.antMatchers("/diet/remove").hasRole("USER")
			.anyRequest().permitAll()  
			.and()
			.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
			.exceptionHandling();
	}
	
	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("https://k6a104.p.ssafy.io");
        configuration.addAllowedOrigin("http://localhost");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
