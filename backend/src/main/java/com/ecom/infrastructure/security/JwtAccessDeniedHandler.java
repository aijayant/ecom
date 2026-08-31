package com.ecom.infrastructure.security;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import tools.jackson.databind.json.JsonMapper;

@Component
@RequiredArgsConstructor
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

	private final JsonMapper jsonMapper;

//	@Override
//	public void handle(HttpServletRequest request, HttpServletResponse response,
//			AccessDeniedException accessDeniedException) throws IOException {
//
//		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
//		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//
//		var errorResponse = ApiResponse.error(403, "Forbidden: You don't have permission to access this resource");
//		jsonMapper.writeValue(response.getOutputStream(), errorResponse);
//
//	}

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException {

		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);

		ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN,
				"Forbidden: You don't have permission to access this resource");
		problem.setTitle("Access Denied");

		jsonMapper.writeValue(response.getOutputStream(), problem);
	}

}
