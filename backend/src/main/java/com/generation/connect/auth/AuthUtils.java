package com.generation.connect.auth;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthUtils {

    public String getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth.getPrincipal() instanceof GCAuthUserDetails userDetails) {
            return userDetails.getUsername();
        }

        throw new RuntimeException("User is not authenticated..");
    }
}
