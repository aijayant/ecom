package com.ecom.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(RoleRepository roleRepository) {
        return args -> {
            // Check if roles exist, if not, create them!
            if (roleRepository.findByRoleName("USER").isEmpty()) {
                Role userRole = new Role();
                userRole.setRoleName("USER");
                roleRepository.save(userRole);
                System.out.println("✅ Created default USER role in database");
            }

            if (roleRepository.findByRoleName("ADMIN").isEmpty()) {
                Role adminRole = new Role();
                adminRole.setRoleName("ADMIN");
                roleRepository.save(adminRole);
                System.out.println("✅ Created default ADMIN role in database");
            }
        };
    }
}
