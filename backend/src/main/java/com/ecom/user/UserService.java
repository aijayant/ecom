package com.ecom.user;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ecom.infrastructure.web.exception.DuplicateResourceException;
import com.ecom.user.dto.UserResponseDTO;

@Service
public class UserService {

	// Spring will automatically inject these because of the constructor (we could
	// use Lombok's @RequiredArgsConstructor too)
	private final UserRepository userRepository;
	private final RoleRepository roleRepository;

	public UserService(UserRepository userRepository, RoleRepository roleRepository) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
	}

	public Optional<User> findByUsername(String username) {
		return Optional.empty();
	}

	public UserResponseDTO convertToDto(User user) {
		UserResponseDTO dto = new UserResponseDTO();
		dto.setId(user.getId());
		dto.setUsername(user.getUsername());
		dto.setEmail(user.getEmail());

		if (user.getRole() != null) {
			dto.setRoleName(user.getRole().getRoleName());
		}
		return dto;
	}
	
	public void createUser(User user, String roleName) {
		if(userRepository.existsByUsername(user.getUsername())) {
			throw new DuplicateResourceException("Username is already taken: " + user.getUsername());
		}
		
		if (userRepository.existsByEmail(user.getEmail())) {
            throw new DuplicateResourceException("Email is already in use: " + user.getEmail());
        }
        if (userRepository.existsByPhoneNumber(user.getPhoneNumber())) {
            throw new DuplicateResourceException("Phone number is already in use: " + user.getPhoneNumber());
        }
        
        Role role = roleRepository.findByRoleName(roleName).orElseThrow(() -> new RuntimeException("Error: Role not found: " + roleName));
        user.setRole(role);
        
        userRepository.save(user);
	}

	public Optional<User> findByLoginId(String loginId) {
	    return userRepository.findByLoginId(loginId);
	}

}
