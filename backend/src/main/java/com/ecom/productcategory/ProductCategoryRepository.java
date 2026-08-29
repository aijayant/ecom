package com.ecom.productcategory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

	Boolean existsByProductCategoryNameIgnoreCase(String productCategoryName);

	Page<ProductCategory> findByProductCategoryNameContainingIgnoreCase(String productCategoryName, Pageable pageable);

}
