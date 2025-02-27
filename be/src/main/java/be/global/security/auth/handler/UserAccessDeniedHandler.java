package be.global.security.auth.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import be.global.exception.ErrorResponder;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class UserAccessDeniedHandler implements AccessDeniedHandler {
	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
		AccessDeniedException accessDeniedException) throws IOException, ServletException {

		ErrorResponder.sendErrorResponse(response, HttpStatus.FORBIDDEN);
		log.warn("Forbidden error happened: {}", accessDeniedException.getMessage());
	}
}
