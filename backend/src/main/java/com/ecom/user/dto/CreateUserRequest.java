package com.ecom.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateUserRequest {

	@NotBlank(message = "Username cannot be empty")
	@Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
	@Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Username can only contain letters, numbers, and underscores")
	private String username;

	@NotBlank(message = "Email is required")
	@Email(message = "Please provide a valid email address")
	private String email;

	@NotBlank(message = "Phone number is required")
	@Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Phone number must be in valid E.164 format (e.g. +1234567890)")
	private String phoneNumber;

	@NotBlank(message = "Password is required")
	@Size(min = 8, max = 100, message = "Password must be at least 8 characters")
	private String password;

	@NotBlank(message = "Full name is required")
	@Size(min = 2, max = 50, message = "Full name must be between 2 and 50 characters")
	private String fullName;

	@NotBlank(message = "Role name is required")
	@Pattern(regexp = "^(ADMIN|USER|MANAGER)$", message = "Invalid role. Must be ADMIN, USER, or MANAGER")
	private String roleName;

}
