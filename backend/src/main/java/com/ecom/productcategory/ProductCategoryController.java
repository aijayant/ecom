package com.ecom.productcategory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.productcategory.dto.ProductCategoryRequest;
import com.ecom.productcategory.dto.ProductCategoryResponse;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/product-categories")
@RequiredArgsConstructor
public class ProductCategoryController {

	private final ProductCategoryService productCategoryService;

//	@PostMapping
//	public ResponseEntity<ProductCategoryResponse> createCategory(@Valid @RequestBody ProductCategoryRequest request) {
//		ProductCategoryResponse response = productCategoryService.createCategory(request);
//		return new ResponseEntity<>(response, HttpStatus.CREATED);
//	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ProductCategoryResponse createCategory(@Valid @RequestBody ProductCategoryRequest request) {
		return productCategoryService.createCategory(request);
	}

//	@GetMapping
//	public ResponseEntity<Page<ProductCategoryResponse>> getAllCategories(
//			@RequestParam(required = false) String categoryName,
//			Pageable pageable) {
//		Page<ProductCategoryResponse> response = productCategoryService.getAllProductCategories(categoryName, pageable);
//		return ResponseEntity.ok(response);
//	}

	@GetMapping
	public Page<ProductCategoryResponse> getAllCategories(@RequestParam(required = false) String categoryName,
			Pageable pageable) {
		return productCategoryService.getAllProductCategories(categoryName, pageable);
	}

//	@GetMapping("/{id}")
//	public ResponseEntity<ProductCategoryResponse> getCategory(@PathVariable Long id) {
//		ProductCategoryResponse response = productCategoryService.getCategory(id);
//		return ResponseEntity.ok(response);
//	}

	@GetMapping("/{id}")
	public ProductCategoryResponse getCategory(@PathVariable @Positive Long id) {
		return productCategoryService.getCategory(id);
	}

//	@PutMapping("/{id}")
//	public ResponseEntity<ProductCategoryResponse> updateCategory(@PathVariable Long id,
//			@Valid @RequestBody ProductCategoryRequest request) {
//		ProductCategoryResponse response = productCategoryService.updateCategory(id, request);
//		return ResponseEntity.ok(response);
//	}

	@PutMapping("/{id}")
	public ProductCategoryResponse updateCategory(@PathVariable @Positive Long id,
			@Valid @RequestBody ProductCategoryRequest request) {
		return productCategoryService.updateCategory(id, request);
	}

//	@DeleteMapping("/{id}")
//	public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
//		productCategoryService.deleteCategory(id);
//		return ResponseEntity.noContent().build();
//	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteCategory(@PathVariable @Positive Long id) {
		productCategoryService.deleteCategory(id);
	}

}
