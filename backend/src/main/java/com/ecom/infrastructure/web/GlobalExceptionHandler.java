package com.ecom.infrastructure.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ecom.infrastructure.web.exception.DuplicateResourceException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationException(
			MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();

		for (FieldError error : ex.getBindingResult().getFieldErrors()) {
			errors.put(error.getField(), error.getDefaultMessage());
		}

		ApiResponse<Map<String, String>> response = ApiResponse.error(400, "Validation Failed");

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}
	
	 @ExceptionHandler(DuplicateResourceException.class)
	    public ResponseEntity<ApiResponse<Void>> handleDuplicateResource(DuplicateResourceException ex) {
	        ApiResponse<Void> response = ApiResponse.error(409, ex.getMessage());
	        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
	    }

}
