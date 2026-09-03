package com.ecom.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgotPasswordRequest {

	@NotBlank
	@Email(message = "Please provide a valid email address")
	private String email;

}
