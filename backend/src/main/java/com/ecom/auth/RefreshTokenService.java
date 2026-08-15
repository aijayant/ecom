package com.ecom.auth;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.ecom.user.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

	// Refresh tokens live for 7 days (in milliseconds)
	private final long REFRESH_TOKEN_DURATION_MS = 604800000L;
	private final RefreshTokenRepository refreshTokenRepository;
	private final UserService userService;

	public RefreshToken createRefreshToken(String username) {

		RefreshToken refreshToken = new RefreshToken();

		// ✅ Call the service to find the user
		refreshToken
				.setUser(userService.findByLoginId(username).orElseThrow(() -> new RuntimeException("User Not Found")));

		refreshToken.setToken(UUID.randomUUID().toString());
		refreshToken.setExpiryDate(Instant.now().plusMillis(REFRESH_TOKEN_DURATION_MS));

		return refreshTokenRepository.save(refreshToken);

	}

	public RefreshToken verifyExpiration(RefreshToken token) {

		if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
			refreshTokenRepository.delete(token);
			throw new RuntimeException("Refresh token was expired. Please make a new signin request");
		}

		return token;

	}

	public Optional<RefreshToken> findByToken(String token) {
		return refreshTokenRepository.findByToken(token);
	}

}
