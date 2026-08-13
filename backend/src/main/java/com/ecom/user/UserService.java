package com.ecom.user;

import java.util.Optional;

import org.springframework.stereotype.Service;

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
			throw new RuntimeException("Error: Username is already taken!");
		}
		
		if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }
        if (userRepository.existsByPhoneNumber(user.getPhoneNumber())) {
            throw new RuntimeException("Error: Phone number is already in use!");
        }
        
        Role role = roleRepository.findByRoleName(roleName).orElseThrow(() -> new RuntimeException("Error: Role not found: " + roleName));
        user.setRole(role);
        
        userRepository.save(user);
	}

	public Optional<User> findByLoginId(String loginId) {
	    return userRepository.findByLoginId(loginId);
	}

}
