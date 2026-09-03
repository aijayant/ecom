package com.ecom.infrastructure.web;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.Data;

@Data
public class PaginationResponse<T> {

	private List<T> content;
	private int pageNumber;
	private int pageSize;
	private long totalElements;
	private int totalPages;
	private boolean last;

	public PaginationResponse(Page<T> page) {
		this.content = page.getContent();
		this.pageNumber = page.getNumber();
		this.pageSize = page.getSize();
		this.totalElements = page.getTotalElements();
		this.totalPages = page.getTotalPages();
		this.last = page.isLast();
	}

}
