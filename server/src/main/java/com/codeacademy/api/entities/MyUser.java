package com.codeacademy.api.entities;

import com.codeacademy.api.validation.ValidRole;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Long id;
    @Column(name = "email",
            nullable = false,
            unique = true,
            columnDefinition = "VARCHAR(255) CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+\\@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,63}$')"
    )
    @NotNull(message = "Email cannot be null")
    @NotBlank(message = "Email ID is mandatory")
    @Email(message = "Invalid email address")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,63}$", message = "Invalid email address")
    private String email;

    @Column(name = "full_name", nullable = false)
    @NotNull(message = "Full name cannot be null")
    @NotBlank(message = "Full name is mandatory")
    @Size(min = 1, max = 100, message = "Full name must be between 1 and 100 characters")
    @Pattern(regexp = "^[A-Za-z\\s]+$", message = "Full name should only contain letters and spaces")
    private String fullName;

    @Column(name = "password", nullable = false)
    @NotNull(message = "Full name cannot be null")
    @NotBlank(message = "Full name is mandatory")
    @Size(min = 8, max = 100, message = "Password must be between 8 and 100 characters")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_\\-!?])(?=\\S+$).*$", message = "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and no whitespace")
    private String password;
    @Column(name = "role", nullable = false)
    @NotNull(message = "Role cannot be null")
    @NotBlank(message = "Role is mandatory")
    @ValidRole(message = "Role must be either USER or ADMIN")
    private String role;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders = new ArrayList<>();

    public MyUser( String email, String fullName, String password,  String role ) {
        this.email = email;
        this.fullName = fullName;
        this.password = password;
        this.role = role;
    }

    public MyUser(String email, String fullName, String password) {
        this.email = email;
        this.fullName = fullName;
        this.password = password;
    }

    public MyUser(String email, String fullName) {
        this.email = email;
        this.fullName = fullName;
    }
}
