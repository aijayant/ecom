package com.ecom.user;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecom.infrastructure.web.PaginationResponse;
import com.ecom.infrastructure.web.exception.DuplicateResourceException;
import com.ecom.infrastructure.web.exception.ResourceNotFoundException;
import com.ecom.user.dto.CreateUserRequest;
import com.ecom.user.dto.UpdateUserRequest;
import com.ecom.user.dto.UserResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;

	@Transactional(readOnly = true)
	public Optional<User> findByLoginId(String loginId) {
		return userRepository.findByLoginId(loginId);
	}

	@Transactional(readOnly = true)
	public Optional<User> findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Transactional
	public void updatePassword(User user, String newPassword) {
		user.setPassword(passwordEncoder.encode(newPassword));
		userRepository.save(user);
	}

	@Transactional
	public UserResponse createUser(CreateUserRequest request) {
		String username = request.getUsername().trim().toLowerCase();
		String email = request.getEmail().trim().toLowerCase();
		String phoneNumber = request.getPhoneNumber() != null ? request.getPhoneNumber().trim() : null;

		validateUniqueness(username, email, phoneNumber, null);

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

	@Transactional(readOnly = true)
	public UserResponse getUserById(Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
		return convertToResponse(user);
	}

	@Transactional(readOnly = true)
	public PaginationResponse<UserResponse> getAllUsers(Pageable pageable) {
		// 1. Fetch from DB and convert Entity to DTO
		Page<UserResponse> page = userRepository.findAll(pageable).map(this::convertToResponse);

		// 2. Wrap it in your company's standard pagination DTO to strip out Spring Boot
		// bloat
		return new PaginationResponse<>(page);
	}

	@Transactional
	public UserResponse updateUser(Long id, UpdateUserRequest request) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

		String newUsername = request.getUsername().trim().toLowerCase();
		String newEmail = request.getEmail().trim().toLowerCase();
		String newPhone = request.getPhoneNumber() != null ? request.getPhoneNumber().trim() : null;

		validateUniqueness(newUsername, newEmail, newPhone, id);

		Role role = roleRepository.findByRoleName(request.getRoleName())
				.orElseThrow(() -> new ResourceNotFoundException("Role not found: " + request.getRoleName()));

		user.setUsername(newUsername);
		user.setEmail(newEmail);
		user.setPhoneNumber(newPhone);
		user.setFullName(request.getFullName().trim());
		user.setRole(role);

		return convertToResponse(userRepository.save(user));
	}

	@Transactional
	public void deleteUser(Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
		userRepository.delete(user);
	}

	private void validateUniqueness(String username, String email, String phoneNumber, Long excludeId) {
		boolean usernameTaken = excludeId == null 
				? userRepository.existsByAnyLoginId(username) 
				: userRepository.existsByAnyLoginIdAndIdNot(username, excludeId);
		if (usernameTaken) {
			throw new DuplicateResourceException("Username is already taken by another user (or used as an email/phone): " + username);
		}

		boolean emailTaken = excludeId == null 
				? userRepository.existsByAnyLoginId(email) 
				: userRepository.existsByAnyLoginIdAndIdNot(email, excludeId);
		if (emailTaken) {
			throw new DuplicateResourceException("Email is already in use by another user (or used as a username/phone): " + email);
		}

		if (phoneNumber != null) {
			boolean phoneTaken = excludeId == null 
					? userRepository.existsByAnyLoginId(phoneNumber) 
					: userRepository.existsByAnyLoginIdAndIdNot(phoneNumber, excludeId);
			if (phoneTaken) {
				throw new DuplicateResourceException("Phone number is already in use by another user (or used as a username/email): " + phoneNumber);
			}
		}
	}

	private UserResponse convertToResponse(User user) {
		return new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getPhoneNumber(),
				user.getFullName(), user.getRole() != null ? user.getRole().getRoleName() : null,
				user.getIsActive(), user.getCreatedDate());
	}

}
