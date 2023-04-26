package com.codeacademy.api.dto;

import com.codeacademy.api.validation.ValidRole;
import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDto {



    private Long id;
    @NotNull(message = "Email cannot be null")
    @NotBlank(message = "Email ID is mandatory")
    private String email;
    @NotNull(message = "Full name cannot be null")
    @NotBlank(message = "Full name is mandatory")
    @Size(min = 1, max = 100, message = "Full name must be between 1 and 100 characters")
    @Pattern(regexp = "^[A-Za-z\\s]+$", message = "Full name should only contain letters and spaces")
    private String fullName;
    @NotNull(message = "Role cannot be null")
    @NotBlank(message = "Role is mandatory")
    @ValidRole(message = "Role must be either USER or ADMIN")
    private String role;
    @NotNull(message = "Full name cannot be null")
    @NotBlank(message = "Full name is mandatory")
    @Size(min = 8, max = 100, message = "Password must be between 8 and 100 characters")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_\\-!?])(?=\\S+$).*$", message = "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and no whitespace")
    private String password;

    public UserDto(String email, String fullName) {
        this.email = email;
        this.fullName = fullName;
    }
    public UserDto(String email, String fullName, String role, String password) {
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.password = password;
    }

    public UserDto(String email, String fullName, String role) {
        this.email = email;
        this.fullName = fullName;
        this.role = role;
    }
}
