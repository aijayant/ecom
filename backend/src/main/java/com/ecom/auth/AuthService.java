package com.ecom.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.ecom.auth.dto.AuthResponse;
import com.ecom.auth.dto.LoginRequest;
import com.ecom.auth.dto.RegisterRequest;
import com.ecom.auth.dto.RefreshTokenRequest;
import com.ecom.infrastructure.security.JwtUtil;
import com.ecom.infrastructure.web.exception.ResourceNotFoundException;
import com.ecom.user.User;
import com.ecom.user.UserService;
import com.ecom.user.dto.CreateUserRequest;
import com.ecom.user.dto.UserResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	private final UserService userService;
	private final RefreshTokenService refreshTokenService;

//	public AuthResponse login(LoginRequest request) {
//
//		// 1. This tells Spring Security to check the password against the DB (via our
//		// CustomUserDetailsService)
//		// If the password is wrong, this will automatically throw an exception and
//		// stop.
//		authenticationManager
//				.authenticate(new UsernamePasswordAuthenticationToken(request.getLoginId(), request.getPassword()));
//
//		// 2. If we reach here, the password was correct! Generate the JWT token.
//		String jwtToken = jwtUtil.generateToken(request.getLoginId());
//
//		RefreshToken refreshToken = refreshTokenService.createRefreshToken(request.getLoginId());
//
//		return new AuthResponse(jwtToken, refreshToken.getToken(), "Login successful");
//	}
	
	public AuthResponse login(LoginRequest request) {

	    authenticationManager.authenticate(
	        new UsernamePasswordAuthenticationToken(
	            request.getLoginId(),
	            request.getPassword()
	        )
	    );

	    User user = userService.findByLoginId(request.getLoginId())
	            .orElseThrow(() ->
	                new ResourceNotFoundException(
	                    "User not found: " + request.getLoginId()
	                )
	            );

	    String username = user.getUsername();

	    String jwtToken = jwtUtil.generateToken(username);

	    RefreshToken refreshToken =
	        refreshTokenService.createRefreshToken(username);

	    return new AuthResponse(
	        jwtToken,
	        refreshToken.getToken(),
	        "Login successful"
	    );
	}


	public AuthResponse register(RegisterRequest request) {

		CreateUserRequest createUserRequest = new CreateUserRequest();
		createUserRequest.setUsername(request.getUsername());
		createUserRequest.setPassword(request.getPassword());
		createUserRequest.setEmail(request.getEmail());
		createUserRequest.setPhoneNumber(request.getPhoneNumber());
		createUserRequest.setFullName(request.getFullName());
		createUserRequest.setRoleName("USER");

		UserResponse user = userService.createUser(createUserRequest);

		String jwtToken = jwtUtil.generateToken(user.getUsername());
		RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getUsername());
		return new AuthResponse(jwtToken, refreshToken.getToken(), "User registered successfully");

	}

	public AuthResponse refreshToken(RefreshTokenRequest request) {
		// CUSTOM LOGIC:
		// Find the token -> Verify it's not expired -> Get the User -> Generate new
		// Access Token

		return refreshTokenService.findByToken(request.getRefreshToken()).map(refreshTokenService::verifyExpiration)
				.map(RefreshToken::getUser).map(user -> {
					String newAccessToken = jwtUtil.generateToken(user.getUsername());
					return new AuthResponse(newAccessToken, request.getRefreshToken(),
							"Token refreshed successfully");
				}).orElseThrow(() -> new ResourceNotFoundException("Refresh token is not in database!"));
	}

}
