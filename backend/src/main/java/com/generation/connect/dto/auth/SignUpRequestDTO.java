package com.generation.connect.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.Objects;

@Setter
@Getter
public class SignUpRequestDTO {

    @NotNull
    @NotEmpty
    @JsonProperty(value = "firstName", required = true)
    private String firstName;

    @NotNull
    @NotEmpty
    @JsonProperty(value = "lastName", required = true)
    private String lastName;

    @JsonProperty(value = "dateOfBirth", required = true)
    @PastOrPresent(message = "Birthdate cannot be in the future")
    private LocalDate dateOfBirth;

    @Email
    @NotEmpty
    @JsonProperty(value = "emailId", required = true)
    private String emailId;

    @NotNull
    @NotEmpty
    @Size(min = 8, max = 30)
    @JsonProperty(value = "password", required = true)
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d.*\\d)(?=.*[^a-zA-Z0-9]).{8,30}$",
            message = "Password must be 8–30 characters long and include at least one uppercase letter, one lowercase letter, two digits, and one special character.")
    private String password;

    public boolean equals(Object object) {
        if (!(object instanceof SignUpRequestDTO)) return false;
        if (!super.equals(object)) return false;
        SignUpRequestDTO that = (SignUpRequestDTO) object;
        return Objects.equals(firstName, that.firstName) && Objects.equals(lastName, that.lastName) && Objects.equals(dateOfBirth, that.dateOfBirth) && Objects.equals(emailId, that.emailId) && Objects.equals(password, that.password);
    }

    public int hashCode() {
        return Objects.hash(super.hashCode(), firstName, lastName, dateOfBirth, emailId, password);
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "SignUpRequestDTO{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", emailId='" + emailId + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
