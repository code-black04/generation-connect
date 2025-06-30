package com.generation.connect.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@Table
@Entity(name = "user_entity")
public class UserEntity {

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Id
    @Column(name = "email_id", unique = true, updatable = false)
    private String emailId;

    @Column(name = "password")
    private String password;

    @Column(name = "last_signed_in_at")
    private LocalDateTime lastSignedInAt;

    @Column(name = "generation_connect_admin")
    private Boolean isGenerationConnectAdmin;

    public Boolean isGenerationConnectAdmin() {
        return isGenerationConnectAdmin;
    }

    public void setGenerationConnectAdmin(Boolean generationConnectAdmin) {
        isGenerationConnectAdmin = generationConnectAdmin;
    }
}
