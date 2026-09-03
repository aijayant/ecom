package com.ecom.auth;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecom.infrastructure.web.exception.ResourceNotFoundException;
import com.ecom.user.User;
import com.ecom.user.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PasswordResetService {

    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserService userService;
    private final JavaMailSender mailSender;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Transactional
    public void processForgotPassword(String email) {
        // Always silently succeed — never reveal if email exists (prevents User Enumeration)
        userService.findByEmail(email).ifPresent(user -> {
            // Clean up any previous tokens for this user first
            passwordResetTokenRepository.deleteAllByUserId(user.getId());

            PasswordResetToken resetToken = new PasswordResetToken();
            resetToken.setToken(UUID.randomUUID().toString());
            resetToken.setUser(user);
            resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(15));
            resetToken.setUsed(false);

            passwordResetTokenRepository.save(resetToken);

            sendResetEmail(user.getEmail(), resetToken.getToken());

            log.info("Password reset email sent to: {}", email);
        });
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {

        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid or expired password reset link."));

        if (Boolean.TRUE.equals(resetToken.getUsed())) {
            throw new IllegalArgumentException("This reset link has already been used.");
        }

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("This reset link has expired. Please request a new one.");
        }

        User user = resetToken.getUser();
        userService.updatePassword(user, newPassword);

        // Mark token as used — prevents replay attacks
        resetToken.setUsed(true);

        // Revoke ALL active refresh tokens — force logout from all devices for security
        refreshTokenRepository.deleteByUser(user);

        log.info("Password reset successfully for user: {}", user.getUsername());
    }

    private void sendResetEmail(String toEmail, String token) {
        String resetLink = frontendUrl + "/reset-password?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Reset Your Password - ECom");
        message.setText("""
                Hi,

                You requested a password reset for your ECom account.

                Click the link below to reset your password (valid for 15 minutes):

                %s

                If you did not request this, please ignore this email. Your password will remain unchanged.

                The ECom Team
                """.formatted(resetLink));

        mailSender.send(message);
    }

}
