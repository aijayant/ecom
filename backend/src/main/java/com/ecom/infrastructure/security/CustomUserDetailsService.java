package com.ecom.infrastructure.security;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ecom.user.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final UserService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		var user = userService.findByLoginId(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
		return User.withUsername(user.getUsername()).password(user.getPassword())
				.authorities(List.of(new SimpleGrantedAuthority(user.getRole().getRoleName()))).build();
	}

}
