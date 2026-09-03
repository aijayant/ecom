package com.ecom.user;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.infrastructure.web.PaginationResponse;
import com.ecom.user.dto.CreateUserRequest;
import com.ecom.user.dto.UpdateUserRequest;
import com.ecom.user.dto.UserResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	// POST /api/v1/users — Admin creates a user via CMS
	// @PreAuthorize: Spring Security checks the JWT authority BEFORE this method
	// runs.
	// If the token doesn't carry "ADMIN", it auto-rejects with 403 Forbidden.
//	@PostMapping
//	@PreAuthorize("hasAuthority('ADMIN')")
//	public ResponseEntity<ApiResponse<UserResponse>> createUser(@Valid @RequestBody CreateUserRequest request) {
//		UserResponse created = userService.createUser(request);
//		return ResponseEntity.status(HttpStatus.CREATED)
//				.body(ApiResponse.success(201, "User created successfully", created));
//	}

	@PostMapping
	@PreAuthorize("hasAuthority('ADMIN')")
	@ResponseStatus(HttpStatus.CREATED)
	public UserResponse createUser(@Valid @RequestBody CreateUserRequest request) {
		return userService.createUser(request);
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('USER')")
	public UserResponse getUser(@PathVariable("id") Long id) {
		return userService.getUserById(id);
	}
	
	@GetMapping
	@PreAuthorize("hasAuthority('USER')")
	public PaginationResponse<UserResponse> getAllUsers(@PageableDefault(size = 20) Pageable pageable) {
		return userService.getAllUsers(pageable);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public UserResponse updateUser(@PathVariable("id") Long id, @Valid @RequestBody UpdateUserRequest request) {
		return userService.updateUser(id, request);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteUser(@PathVariable("id") Long id) {
		userService.deleteUser(id);
	}

}
