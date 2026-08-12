package com.ecom.infrastructure.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String secretKey;

	@Value("${jwt.expiration}")
	private long jwtExpiration;

	// Converts the raw string from application.properties into a real cryptographic
	// key
	private SecretKey getSigningKey() {

		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		return Keys.hmacShaKeyFor(keyBytes);

	}

	// Job 1: Generate a token when user logs in
	public String generateToken(String username) {
		return Jwts.builder().subject(username).issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + jwtExpiration)).signWith(getSigningKey()).compact();
	}

	// Job 2: Extract the username from a token
	public String extractUsername(String token) {
		return Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token).getPayload().getSubject();
	}

	// Job 3: Check if the token is valid and belongs to the right user
	public boolean isTokenValid(String token, String username) {
		final String extractedusername = extractUsername(token);
		return extractedusername.equals(username) && !isTokenExpired(token);
	}

	// Private helper: checks if the expiry date is already in the past
	private boolean isTokenExpired(String token) {
		Date expiration = Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token).getPayload()
				.getExpiration();
		return expiration.before(new Date());
	}

}
