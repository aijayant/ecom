package com.ecom.auth;

import org.springframework.http.HttpHeaders;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.auth.dto.AuthResponse;
import com.ecom.auth.dto.ForgotPasswordRequest;
import com.ecom.auth.dto.LoginRequest;
import com.ecom.auth.dto.RefreshTokenRequest;
import com.ecom.auth.dto.RegisterRequest;
import com.ecom.auth.dto.ResetPasswordRequest;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;
	private final PasswordResetService passwordResetService;

	// Dynamically read the secure flag from application.properties.
	// Defaults to false for local dev. Set this to true in your prod profile!
	@Value("${app.security.cookie.secure:false}")
	private boolean secureCookie;

	// Helper method to attach the HttpOnly cookie
	private void setRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
		ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken).httpOnly(true).secure(secureCookie)
				.path("/api/auth/refresh") // Scoped securely to the refresh endpoint
				.maxAge(7 * 24 * 60 * 60) // 7 days
				.sameSite("Lax").build();
		response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
	}

	// Helper method to destroy the cookie on logout
	private void clearRefreshTokenCookie(HttpServletResponse response) {
		ResponseCookie cookie = ResponseCookie.from("refreshToken", "").httpOnly(true).secure(secureCookie)
				.path("/api/auth/refresh").maxAge(0) // Immediately expire
				.sameSite("Lax").build();
		response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
	}

	@PostMapping("/login")
	public AuthResponse login(@Valid @RequestBody LoginRequest request, HttpServletResponse response) {
		AuthResponse authResponse = authService.login(request);
		setRefreshTokenCookie(response, authResponse.getRefreshToken());
		return authResponse;
	}

	@PostMapping("/register")
	@ResponseStatus(HttpStatus.CREATED)
	public AuthResponse register(@Valid @RequestBody RegisterRequest request, HttpServletResponse response) {
		AuthResponse authResponse = authService.register(request);
		setRefreshTokenCookie(response, authResponse.getRefreshToken());
		return authResponse;
	}

//	@PostMapping("/refresh")
//	public AuthResponse refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
//		return authService.refreshToken(request);
//	}

	@PostMapping("/refresh")
	public AuthResponse refreshToken(@CookieValue(name = "refreshToken") String refreshToken,
			HttpServletResponse response) {

		// Pass the token extracted from the cookie into your existing service logic
		RefreshTokenRequest request = new RefreshTokenRequest();
		request.setRefreshToken(refreshToken);

		AuthResponse authResponse = authService.refreshToken(request);

		// If your refresh logic generates a NEW refresh token (rotation), set it again!
		setRefreshTokenCookie(response, authResponse.getRefreshToken());

		return authResponse;
	}

	@PostMapping("/logout")
	public void logout(HttpServletResponse response) {
		clearRefreshTokenCookie(response);
	}

	@PostMapping("/forgot-password")
	public void forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
		passwordResetService.processForgotPassword(request.getEmail());
	}

	@PostMapping("/reset-password")
	public void resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
		passwordResetService.resetPassword(request.getToken(), request.getNewPassword());
	}

}
