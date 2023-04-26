package com.codeacademy.api.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class SignUpRequest {

    public SignUpRequest(String email, String fullName, String password) {
        this.email = email;
        this.fullName = fullName;
        this.password = password;
    }

    @NotNull(message = "Email cannot be null")
    @NotBlank(message = "Email ID is mandatory")
    @Email(message = "Invalid email address")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,63}$", message = "Invalid email address")
    private String email;
    @NotNull(message = "Full name cannot be null")
    @NotBlank(message = "Full name is mandatory")
    @Size(min = 1, max = 100, message = "Full name must be between 1 and 100 characters")
    @Pattern(regexp = "^[A-Za-z\\s]+$", message = "Full name should only contain letters and spaces")
    private String fullName;
    @NotNull(message = "Full name cannot be null")
    @NotBlank(message = "Full name is mandatory")
    @Size(min = 8, max = 100, message = "Password must be between 8 and 100 characters")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_\\-!?])(?=\\S+$).*$", message = "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and no whitespace")
    private String password;
}
