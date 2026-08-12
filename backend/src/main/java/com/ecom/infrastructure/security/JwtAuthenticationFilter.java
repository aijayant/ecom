package com.ecom.infrastructure.security;

import java.io.IOException;

import org.jspecify.annotations.NullMarked;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
@NullMarked
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtUtil jwtUtil;
	private final CustomUserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		// Step 1: Read the Authorization header
		final String authHeader = request.getHeader("Authorization");

		// Step 2: If no token, skip this filter — let Spring Security handle it as
		// unauthenticated
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}

		final String jwt = authHeader.substring(7);
		final String username = jwtUtil.extractUsername(jwt);

		// Step 3: If we got a username AND this request isn't already authenticated
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			// Step 4: Load the user's latest details from the database
			UserDetails userDetails = userDetailsService.loadUserByUsername(username);

			// Step 5: Validate the token against the loaded user
			if (jwtUtil.isTokenValid(jwt, userDetails.getUsername())) {

				// Step 7: Create an authentication object and register it in the
				// SecurityContext
				var authToken = new UsernamePasswordAuthenticationToken(userDetails, null,
						userDetails.getAuthorities());
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
		}

		// Step 8: Always pass the request to the next filter in the chain
		filterChain.doFilter(request, response);

	}

}
