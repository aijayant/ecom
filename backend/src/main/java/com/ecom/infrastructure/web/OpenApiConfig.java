package com.ecom.infrastructure.web;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@Configuration
@OpenAPIDefinition(
		info = @Info(
				title = "E-Commerce API",
				description = "Backend REST API documentation for the E-Commerce application.",
				version = "1.0",
				contact = @Contact(
						name = "Admin",
						email = "admin@example.com"
				)
		),
		security = {
				@SecurityRequirement(name = "bearerAuth")
		}
)
@SecurityScheme(
		name = "bearerAuth",
		description = "JWT authentication. Please enter your JWT token below. DO NOT include the 'Bearer ' prefix.",
		scheme = "bearer",
		type = SecuritySchemeType.HTTP,
		bearerFormat = "JWT",
		in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
	// This class acts as a central configuration for Swagger/OpenAPI.
	// It automatically adds the "Authorize" button to the Swagger UI
	// and applies the JWT bearer token to all requests globally.
}
