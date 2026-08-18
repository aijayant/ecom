package com.ecom.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.infrastructure.web.ApiResponse;
import com.ecom.user.dto.CreateUserRequest;
import com.ecom.user.dto.UserResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	// POST /api/v1/users — Admin creates a user via CMS
	// @PreAuthorize: Spring Security checks the JWT authority BEFORE this method runs.
	// If the token doesn't carry "ADMIN", it auto-rejects with 403 Forbidden.
	@PostMapping
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<ApiResponse<UserResponse>> createUser(@Valid @RequestBody CreateUserRequest request) {
		UserResponse created = userService.createAdminUser(request);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(ApiResponse.success(201, "User created successfully", created));
	}

}
