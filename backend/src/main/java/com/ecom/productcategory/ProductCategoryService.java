package com.ecom.productcategory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecom.infrastructure.web.exception.ResourceNotFoundException;
import com.ecom.productcategory.dto.ProductCategoryRequest;
import com.ecom.productcategory.dto.ProductCategoryResponse;
import com.sun.jdi.request.DuplicateRequestException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductCategoryService {

	private final ProductCategoryRepository productCategoryRepository;

	@Transactional
	public ProductCategoryResponse createCategory(ProductCategoryRequest request) {

		String categoryName = normalizeName(request.getCategoryName());

		if (productCategoryRepository.existsByProductCategoryNameIgnoreCase(categoryName)) {
			throw new DuplicateRequestException("Product Category name already exists");
		}

		ProductCategory category = new ProductCategory();
		category.setProductCategoryName(categoryName);

		ProductCategory savedCategory = productCategoryRepository.save(category);

		return convertToResponse(savedCategory);
	}

	@Transactional
	public ProductCategoryResponse updateCategory(Long id, ProductCategoryRequest request) {
		ProductCategory category = findCategoryById(id);

		String newCategoryName = normalizeName(request.getCategoryName());

		if (!category.getProductCategoryName().equalsIgnoreCase(newCategoryName) &&
				productCategoryRepository.existsByProductCategoryNameIgnoreCase(newCategoryName)) {
			throw new DuplicateRequestException("Product Category name already exists");
		}

		category.setProductCategoryName(newCategoryName);

		// Rely on JPA dirty checking; no explicit save() needed
		return convertToResponse(category);
	}

	@Transactional
	public void deleteCategory(Long id) {
		ProductCategory category = findCategoryById(id);
		productCategoryRepository.delete(category);
	}

	public Page<ProductCategoryResponse> getAllProductCategories(String categoryName, Pageable pageable) {
		Page<ProductCategory> categoriesPage;

		if (categoryName != null && !categoryName.trim().isEmpty()) {
			categoriesPage = productCategoryRepository
					.findByProductCategoryNameContainingIgnoreCase(categoryName.trim(), pageable);
		} else {
			categoriesPage = productCategoryRepository.findAll(pageable);
		}

		return categoriesPage.map(this::convertToResponse);
	}

	public ProductCategoryResponse getCategory(Long id) {
		ProductCategory category = findCategoryById(id);
		return convertToResponse(category);
	}

	private ProductCategory findCategoryById(Long id) {
		return productCategoryRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(
						"Product Category not found with id: " + id));
	}

	private String normalizeName(String name) {
		return name == null ? null : name.trim();
	}

	private ProductCategoryResponse convertToResponse(ProductCategory category) {
		return new ProductCategoryResponse(
				category.getId(),
				category.getProductCategoryName(),
				category.getIsActive(),
				category.getCreatedDate());
	}

}
