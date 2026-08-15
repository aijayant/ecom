package com.ecom.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecom.auth.dto.AuthResponseDTO;
import com.ecom.auth.dto.LoginRequestDTO;
import com.ecom.auth.dto.RegisterRequestDTO;
import com.ecom.auth.dto.RefreshTokenRequestDTO;
import com.ecom.infrastructure.security.JwtUtil;
import com.ecom.user.User;
import com.ecom.user.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	private final UserService userService;
	private final PasswordEncoder passwordEncoder;
	private final RefreshTokenService refreshTokenService;

	public AuthResponseDTO login(LoginRequestDTO request) {

		// 1. This tells Spring Security to check the password against the DB (via our
		// CustomUserDetailsService)
		// If the password is wrong, this will automatically throw an exception and
		// stop.
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

		// 2. If we reach here, the password was correct! Generate the JWT token.
		String jwtToken = jwtUtil.generateToken(request.getUsername());

		RefreshToken refreshToken = refreshTokenService.createRefreshToken(request.getUsername());

		return new AuthResponseDTO(jwtToken, refreshToken.getToken(), "Login successful");
	}

	public AuthResponseDTO register(RegisterRequestDTO request) {

		User user = convertToEntity(request);

		user.setPassword(passwordEncoder.encode(request.getPassword()));

		userService.createUser(user, "USER");

		String jwtToken = jwtUtil.generateToken(user.getUsername());
		RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getUsername());
		return new AuthResponseDTO(jwtToken, refreshToken.getToken(), "User registered successfully");

	}

	public AuthResponseDTO refreshToken(RefreshTokenRequestDTO request) {
		// CUSTOM LOGIC:
		// Find the token -> Verify it's not expired -> Get the User -> Generate new
		// Access Token

		return refreshTokenService.findByToken(request.getRefreshToken()).map(refreshTokenService::verifyExpiration)
				.map(RefreshToken::getUser).map(user -> {
					String newAccessToken = jwtUtil.generateToken(user.getUsername());
					return new AuthResponseDTO(newAccessToken, request.getRefreshToken(),
							"Token refreshed successfully");
				}).orElseThrow(() -> new RuntimeException("Refresh token is not in database!"));
	}

	private User convertToEntity(RegisterRequestDTO request) {
		User user = new User();
		user.setUsername(request.getUsername());
		user.setEmail(request.getEmail());
		user.setPhoneNumber(request.getPhoneNumber());
		user.setFullName(request.getFullName());
		return user;
	}

}
