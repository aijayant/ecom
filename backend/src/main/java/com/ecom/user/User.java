package com.ecom.user;

import java.util.ArrayList;
import java.util.List;

import com.ecom.auth.RefreshToken;
import com.ecom.infrastructure.jpa.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "Username cannot be blank") // Stops Java from saving empty strings
	@Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
	@Column(unique = true, nullable = false, length = 20) // Configures the actual DB column
	private String username;

	@NotBlank(message = "Password cannot be blank")
	@Column(nullable = false)
	private String password;

	@NotBlank(message = "Email is required")
	@Email(message = "Please provide a valid email address")
	@Column(unique = true, nullable = false)
	private String email;

	@NotBlank(message = "Phone number is required")
	@Pattern(regexp = "^[6-9][0-9]{9}$", message = "Phone number must be exactly 10 digits and start with 6-9")
	@Column(name = "phone_number", unique = true, nullable = false)
	private String phoneNumber;

	@NotBlank(message = "Full name is required")
	@Size(min = 2, max = 50, message = "Full name must be between 2 and 50 characters")
	@Column(name = "full_name", nullable = false)
	private String fullName;

	@NotNull(message = "Role association is required")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "role_id", nullable = false) // Added nullable = false to enforce it in DB
	private Role role;

	// When a User is deleted, automatically delete all their associated refresh tokens
	@OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
	private List<RefreshToken> refreshTokens = new ArrayList<>();

}
