package be.global.security.config;

import java.util.Arrays;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import be.domain.user.mapper.UserMapper;
import be.global.security.auth.cookieManager.CookieManager;
import be.global.security.auth.filter.JwtAuthenticationFilter;
import be.global.security.auth.filter.JwtVerificationFilter;
import be.global.security.auth.handler.UserAccessDeniedHandler;
import be.global.security.auth.handler.UserAuthenticationEntryPoint;
import be.global.security.auth.handler.UserAuthenticationFailureHandler;
import be.global.security.auth.handler.UserAuthenticationSuccessHandler;
import be.global.security.auth.jwt.JwtTokenizer;
import be.global.security.auth.userdetails.UserDetailService;
import be.global.security.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity(debug = true)
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig {
	private final CookieManager cookieManager;
	private final UserMapper userMapper;
	private final JwtTokenizer jwtTokenizer;
	private final UserDetailService userDetailService;
	private final CustomAuthorityUtils customAuthorityUtils;
	private final RedisTemplate<String, String> redisTemplate;
	private final DataSource dataSource;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.headers().frameOptions().sameOrigin()

			.and()
			.csrf().disable()
			.cors().configurationSource(corsConfigurationSource())
			.and()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			// .and()
			// .sessionManagement(s ->
			// 	s.maximumSessions(1) // 동일 세션 개수 제한 (중복 로그인 방지)
			// 		.maxSessionsPreventsLogin(false) // 중복 로그인 시 먼저 로그인한 사용자 로그아웃
			// 		.expiredSessionStrategy(securitySessionExpiredStrategy)) // 세션 만료 시 전략
			.and()
			.formLogin().disable()
			.httpBasic().disable()
			.exceptionHandling()
			.authenticationEntryPoint(new UserAuthenticationEntryPoint())
			.accessDeniedHandler(new UserAccessDeniedHandler())
			.and()
			.apply(new CustomFilterConfigurer())
			.and()
			.logout()
			.deleteCookies("refreshToken")
			.deleteCookies("visit_cookie")
			.and()
			.authorizeHttpRequests(authorize -> authorize
				.anyRequest().permitAll())
			.rememberMe()
			.key("getabeerCalander")
			.rememberMeParameter("getabeer-remember-me")
			.rememberMeCookieName("getabeer-remember-me")
			.userDetailsService(userDetailService)
			.tokenRepository(persistentTokenRepository());

		// 후속 작업용 필터. 지우지 말아주세용.
		// .addFilterBefore(oAuth2AuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
		@Override
		public void configure(HttpSecurity builder) throws Exception {
			AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

			JwtAuthenticationFilter jwtAuthenticationFilter =
				new JwtAuthenticationFilter(
					authenticationManager, jwtTokenizer, userMapper, cookieManager, redisTemplate);

			jwtAuthenticationFilter.setFilterProcessesUrl("/api/login");
			jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());
			jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

			JwtVerificationFilter jwtVerificationFilter =
				new JwtVerificationFilter(jwtTokenizer, customAuthorityUtils);

			builder
				.addFilter(jwtAuthenticationFilter)
				.addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
		}
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedOrigin("https://www.getabeer.co.kr");
		configuration.addAllowedOrigin("https://getabeer.co.kr");
		configuration.addAllowedOrigin("https://server.getabeer.co.kr");
		configuration.addAllowedOrigin("http://localhost:3000");
		configuration.addAllowedOrigin("http://localhost:8080");
		configuration.addAllowedHeader("*");
		configuration.setAllowCredentials(true);
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
		configuration.setMaxAge(3600L);
		configuration.addExposedHeader("Authorization");

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);

		return source;
	}

	@Bean
	public PersistentTokenRepository persistentTokenRepository() {
		JdbcTokenRepositoryImpl jdbcTokenRepository = new JdbcTokenRepositoryImpl();
		jdbcTokenRepository.setDataSource(dataSource);
		return jdbcTokenRepository;
	}

	@Bean
	public RememberMeServices rememberMeServices(PersistentTokenRepository persistentTokenRepository) {
		PersistentTokenBasedRememberMeServices rememberMeServices = new
			PersistentTokenBasedRememberMeServices("getabeerCalander",
			userDetailService, persistentTokenRepository);
		rememberMeServices.setParameter("getabeer-remember-me");
		rememberMeServices.setCookieName("getabeer-remember-me");
		return rememberMeServices;
	}
}
