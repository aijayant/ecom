package com.ecom.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.auth.dto.AuthResponseDTO;
import com.ecom.auth.dto.LoginRequestDTO;
import com.ecom.auth.dto.RegisterRequestDTO;
import com.ecom.infrastructure.web.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("/login")
	public ResponseEntity<ApiResponse<AuthResponseDTO>> login(@Valid @RequestBody LoginRequestDTO request) {
		AuthResponseDTO tokenData = authService.login(request);
		return ResponseEntity.ok(ApiResponse.success(200, "Registration successful", tokenData));

	}

	@PostMapping("/register")
	public ResponseEntity<ApiResponse<AuthResponseDTO>> register(@Valid @RequestBody RegisterRequestDTO request) {
		AuthResponseDTO tokenData = authService.register(request);
		return ResponseEntity.ok(ApiResponse.success(201, "Registration successful", tokenData));
	}

}
