package com.ecom.auth;

import com.ecom.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// 🟩 WE PROVIDE: This is standard Spring Data JPA, completely unrelated to Spring Security.

@Repository
interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    
    // We need to look up a token when the user sends it back to us
    Optional<RefreshToken> findByToken(String token);
    
    // We need this to wipe out old tokens when a user logs out or gets hacked
    void deleteByUser(User user);
}
