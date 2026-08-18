package com.ecom.infrastructure.web.exception;

// 🟩 WE PROVIDE: This is our own custom exception.
// Spring Security has no concept of "resource not found". That's our business logic.
public class ResourceNotFoundException extends RuntimeException {

	public ResourceNotFoundException(String message) {
		super(message);
	}

}
