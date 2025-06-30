package com.generation.connect.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

public class SignInRequestDTO {

    @Getter
    @Setter
    private String username;

    @Setter
    @Getter
    private String password;

    @JsonProperty(value = "isAdmin")
    private boolean isAdmin;


    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
}
