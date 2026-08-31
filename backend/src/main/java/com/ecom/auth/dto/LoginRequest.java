package com.ecom.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

	@NotBlank(message = "loginId cannot be blank")
	private String loginId;

	@NotBlank(message = "Password cannot be blank")
	private String password;

}
