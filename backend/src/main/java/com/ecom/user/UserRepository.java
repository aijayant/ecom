package com.ecom.user;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

interface UserRepository extends JpaRepository<User, Long> {

	@EntityGraph(attributePaths = { "role" })
	@Query("SELECT u FROM User u WHERE u.username = :loginId OR u.email = :loginId OR u.phoneNumber = :loginId")
	Optional<User> findByLoginId(@Param("loginId") String loginId);

	@Query("SELECT COUNT(u) > 0 FROM User u WHERE u.username = :value OR u.email = :value OR u.phoneNumber = :value")
	boolean existsByAnyLoginId(@Param("value") String value);

	@Query("SELECT COUNT(u) > 0 FROM User u WHERE (u.username = :value OR u.email = :value OR u.phoneNumber = :value) AND u.id != :excludeId")
	boolean existsByAnyLoginIdAndIdNot(@Param("value") String value, @Param("excludeId") Long excludeId);

	Optional<User> findByEmail(String email);

	@EntityGraph(attributePaths = { "role" })
	Page<User> findAll(Pageable pageable);

	@EntityGraph(attributePaths = { "role" })
	Optional<User> findById(Long id);

}
