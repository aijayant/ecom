package com.ecom.infrastructure.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
	
	 private Integer responseCode; // e.g., 200, 400, 401
	    private String responseMessage; // e.g., "User saved successfully"
	    private T data;
	    public static <T> ApiResponse<T> success(Integer code, String message, T data) {
	        return new ApiResponse<>(code, message, data);
	    }
	    public static <T> ApiResponse<T> error(Integer code, String message) {
	        return new ApiResponse<>(code, message, null);
	    }

}
