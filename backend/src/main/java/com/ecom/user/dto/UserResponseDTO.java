package com.ecom.user.dto;

import lombok.Data;

@Data
public class UserResponseDTO {

	private Long id;
	private String username;
	private String email;
	private String phoneNumber;
	private String fullName;
	private String roleName;
	private Boolean isActive;

}
