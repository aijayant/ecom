package com.ecom.auth;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.ecom.infrastructure.security.JwtProperties;
import com.ecom.infrastructure.web.exception.ResourceNotFoundException;
import com.ecom.user.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

	private final RefreshTokenRepository refreshTokenRepository;
	private final UserService userService;
	private final JwtProperties jwtProperties;

	public RefreshToken createRefreshToken(String username) {

		RefreshToken refreshToken = new RefreshToken();

		// ✅ Call the service to find the user
		refreshToken.setUser(
				userService.findByLoginId(username).orElseThrow(() -> new ResourceNotFoundException("User Not Found")));

		refreshToken.setToken(UUID.randomUUID().toString());
		refreshToken.setExpiryDate(Instant.now().plusMillis(jwtProperties.refreshExpiration()));

		return refreshTokenRepository.save(refreshToken);

	}

	public RefreshToken verifyExpiration(RefreshToken token) {

		if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
			refreshTokenRepository.delete(token);
			throw new IllegalArgumentException("Refresh token was expired. Please make a new signin request");
		}

		return token;

	}

	public Optional<RefreshToken> findByToken(String token) {
		return refreshTokenRepository.findByToken(token);
	}

}
