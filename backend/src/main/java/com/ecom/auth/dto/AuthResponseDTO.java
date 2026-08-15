package com.ecom.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponseDTO {

	private String accessToken;   // Renamed from 'token' for clarity
    private String refreshToken;
    private String message;

}
