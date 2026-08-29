package com.ecom.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.auth.dto.AuthResponse;
import com.ecom.auth.dto.LoginRequest;
import com.ecom.auth.dto.RegisterRequest;
import com.ecom.auth.dto.RefreshTokenRequest;
import com.ecom.infrastructure.web.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("/login")
	public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
		AuthResponse tokenData = authService.login(request);
		return ResponseEntity.ok(ApiResponse.success(200, "Login successful", tokenData));

	}

	@PostMapping("/register")
	public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
		AuthResponse tokenData = authService.register(request);
		return ResponseEntity.ok(ApiResponse.success(201, "Registration successful", tokenData));
	}

	@PostMapping("/refresh")
	public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(
			@Valid @RequestBody RefreshTokenRequest request) {
		AuthResponse tokenData = authService.refreshToken(request);
		return ResponseEntity.ok(ApiResponse.success(200, "Token refreshed successfully", tokenData));
	}

}
