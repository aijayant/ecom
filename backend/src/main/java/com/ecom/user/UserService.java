package com.ecom.user;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecom.infrastructure.web.exception.DuplicateResourceException;
import com.ecom.infrastructure.web.exception.ResourceNotFoundException;
import com.ecom.user.dto.CreateUserRequest;
import com.ecom.user.dto.UserResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;

	public Optional<User> findByLoginId(String loginId) {
		return userRepository.findByLoginId(loginId);
	}

	@Transactional
	public UserResponse createUser(CreateUserRequest request) {
		String username = request.getUsername().trim();
		String email = request.getEmail().trim().toLowerCase();
		String phoneNumber = request.getPhoneNumber() != null ? request.getPhoneNumber().trim() : null;

		validateUniqueness(username, email, phoneNumber);

		Role role = roleRepository.findByRoleName(request.getRoleName())
				.orElseThrow(() -> new ResourceNotFoundException("Role not found: " + request.getRoleName()));

		User user = new User();
		user.setUsername(username);
		user.setEmail(email);
		user.setPhoneNumber(phoneNumber);
		user.setFullName(request.getFullName().trim());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setRole(role);

		User savedUser = userRepository.save(user);

		return convertToResponse(savedUser);
	}

	private void validateUniqueness(String username, String email, String phoneNumber) {
		if (userRepository.existsByUsername(username)) {
			throw new DuplicateResourceException("Username is already taken: " + username);
		}
		if (userRepository.existsByEmail(email)) {
			throw new DuplicateResourceException("Email is already in use: " + email);
		}
		if (phoneNumber != null && userRepository.existsByPhoneNumber(phoneNumber)) {
			throw new DuplicateResourceException("Phone number is already in use: " + phoneNumber);
		}
	}

	private UserResponse convertToResponse(User user) {
		return new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getPhoneNumber(),
				user.getFullName(), user.getRole() != null ? user.getRole().getRoleName() : null);
	}

}
