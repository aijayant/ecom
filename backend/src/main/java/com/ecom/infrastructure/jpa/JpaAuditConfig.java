package com.ecom.infrastructure.jpa;

import java.util.Optional;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class JpaAuditConfig {

	@Bean
	public AuditorAware<String> auditorProvider() {
		return () -> {
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			// if Nobody is Loggwed in
			if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
				return Optional.of("SYSTEM");
			}
			// Otherwise, record the username
			return Optional.of(auth.getName());
		};
	}

}
