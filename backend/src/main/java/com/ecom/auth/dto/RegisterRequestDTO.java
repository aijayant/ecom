package com.ecom.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RegisterRequestDTO {

	@NotBlank(message = "Username is required")
	private String username;
	
	@NotBlank(message = "Password is required")
	private String password;
	
	@Email(message = "Invalid email format")
	@NotBlank(message = "Email is required")
	private String email;
	
	@Pattern(regexp = "^\\d{10}$", message = "Phone number must be exactly 10 digits")
	private String phoneNumber;
	
	@NotBlank(message = "Full name is required")
	private String fullName;

}
