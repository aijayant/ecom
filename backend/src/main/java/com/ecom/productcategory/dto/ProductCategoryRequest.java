package com.ecom.productcategory.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductCategoryRequest {

	@NotBlank(message = "Category name is required")
	@Size(min = 3, max = 50, message = "Category name must be between 2 and 50 characters")
	private String categoryName;

}
