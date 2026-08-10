package com.ecom.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

interface UserRepository extends JpaRepository<User, Long> {

	@EntityGraph(attributePaths = { "role" })
	@Query("SELECT u FROM User u WHERE u.username = :loginID OR u.email = :loginId OR u.phoneNumber = u.loginId")
	Optional<User> findByLoginId(@Param("loginId") String loginId);

	boolean existsByUsername(String username);

	boolean existsByEmail(String email);

	boolean existsByPhoneNumber(String phoneNumber);

}
