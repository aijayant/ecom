package com.ecom.user;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecom.infrastructure.web.exception.DuplicateResourceException;
import com.ecom.user.dto.CreateUserRequest;
import com.ecom.user.dto.UserResponse;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
	}


	public Optional<User> findByLoginId(String loginId) {
		return userRepository.findByLoginId(loginId);
	}

	// Called by AuthService during self-registration (role = "USER")
	public void createUser(User user, String roleName) {
		validateUniqueness(user.getUsername(), user.getEmail(), user.getPhoneNumber());

		Role role = roleRepository.findByRoleName(roleName)
				.orElseThrow(() -> new RuntimeException("Error: Role not found: " + roleName));
		user.setRole(role);

		userRepository.save(user);
	}

	// Called by UserController (admin CMS). 
	public UserResponse createAdminUser(CreateUserRequest request) {
		User user = new User();
		user.setUsername(request.getUsername());
		user.setEmail(request.getEmail());
		user.setPhoneNumber(request.getPhoneNumber());
		user.setFullName(request.getFullName());
		user.setPassword(passwordEncoder.encode(request.getPassword()));

		// Delegate to core save method — role lookup, duplicate check, and DB save
		createUser(user, request.getRoleName());

		return convertToResponse(user);
	}

	private void validateUniqueness(String username, String email, String phoneNumber) {
		if (userRepository.existsByUsername(username)) {
			throw new DuplicateResourceException("Username is already taken: " + username);
		}
		if (userRepository.existsByEmail(email)) {
			throw new DuplicateResourceException("Email is already in use: " + email);
		}
		if (userRepository.existsByPhoneNumber(phoneNumber)) {
			throw new DuplicateResourceException("Phone number is already in use: " + phoneNumber);
		}
	}

	private UserResponse convertToResponse(User user) {
		return new UserResponse(
				user.getId(),
				user.getUsername(),
				user.getEmail(),
				user.getPhoneNumber(),
				user.getFullName(),
				user.getRole() != null ? user.getRole().getRoleName() : null);
	}

}
