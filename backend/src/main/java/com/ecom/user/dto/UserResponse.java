package com.ecom.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

// 🟩 WE PROVIDE: This is our response DTO.
// We NEVER return the raw User entity from an API — it would expose the hashed password!
// This is a sanitised view of the User that is safe to send over the wire.
@Getter
@Setter
@AllArgsConstructor
public class UserResponse {

	private Long id;
	private String username;
	private String email;
	private String phoneNumber;
	private String fullName;
	private String roleName;

}
