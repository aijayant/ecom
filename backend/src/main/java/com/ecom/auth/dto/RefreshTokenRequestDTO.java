package com.ecom.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RefreshTokenRequestDTO {
	
	@NotBlank(message = "Refresh token is required")
	private String refreshToken;
	
}