package com.ecom.productcategory.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProductCategoryResponse {
	
	private Long id;
	private String categoryName;
	private Boolean isActive;
	private LocalDateTime createdDate;

}
