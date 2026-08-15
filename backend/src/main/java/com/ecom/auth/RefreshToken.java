package com.ecom.auth;

import com.ecom.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

// 🟩 WE PROVIDE: This entire class. Spring Security knows absolutely NOTHING about Refresh Tokens. 
// The framework only cares about the short-lived JWT Access Token. Managing Refresh Tokens is 100% our custom business logic.

@Entity
@Table(name = "refresh_tokens")
@Data
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The actual long random string we send to the client
    @Column(nullable = false, unique = true)
    private String token;

    // The exact moment this token becomes invalid
    @Column(nullable = false)
    private Instant expiryDate;

    // We link the token directly to a User. 
    // FetchType.LAZY means we don't load the User from the DB until we explicitly call getUser()
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;
}
