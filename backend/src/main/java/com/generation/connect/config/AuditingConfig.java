package com.generation.connect.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;

import java.security.Principal;
import java.util.Optional;

@Configuration
public class AuditingConfig {

    @Bean
    public AuditorAware<String> auditorAware() {
        return () -> {
            return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
                    .map(Principal::getName);
        };
    }
}
