package be.global.security.auth.filter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import be.global.security.auth.jwt.JwtTokenizer;
import be.global.security.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
	private final JwtTokenizer jwtTokenizer;
	private final CustomAuthorityUtils authorityUtils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		try {
			Map<String, Object> claims = jwtTokenizer.verifyJws(request);
			setAuthenticationToContext(claims);
		} catch (SignatureException se) {
			request.setAttribute("exception", se);
		} catch (ExpiredJwtException ee) { // AccessToken 기간 만료
			request.setAttribute("exception", ee);
			response.sendError(401, "Access Token이 만료되었습니다");
		} catch (Exception e) {
			request.setAttribute("exception", e);
		}

		filterChain.doFilter(request, response);
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		String authorization = request.getHeader("Authorization");

		return authorization == null || !authorization.startsWith("Bearer")
			|| request.getRequestURI().equals("/api/token/refresh"); // 토큰 재발급일 경우 로직 건너뛰기
	}

	private void setAuthenticationToContext(Map<String, Object> claims) {
		String email = (String)claims.get("email");
		List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("role"));
		Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorities);
		SecurityContextHolder.getContext().setAuthentication(authentication);
	}
}
