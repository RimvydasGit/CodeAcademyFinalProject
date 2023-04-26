package com.codeacademy.api.controllers;

import com.codeacademy.api.dto.AuthResponse;
import com.codeacademy.api.dto.LoginRequest;
import com.codeacademy.api.dto.SignUpRequest;
import com.codeacademy.api.dto.UserDto;
import com.codeacademy.api.entities.MyUser;
import com.codeacademy.api.exception.DuplicatedUserInfoException;
import com.codeacademy.api.security.TokenProvider;
import com.codeacademy.api.services.AuthenticationService;
import com.codeacademy.api.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import static com.codeacademy.api.utils.Roles.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final AuthenticationService authenticationService;

    @PostMapping("/authenticate")
    public AuthResponse login( @Valid @RequestBody LoginRequest loginRequest) {
        String token = authenticationService.authenticateAndGetToken(loginRequest.getEmail(), loginRequest.getPassword());
        return new AuthResponse(token);
    }
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/signup")
    public AuthResponse signUp( @Valid @RequestBody SignUpRequest signUpRequest) {
        MyUser existingUser = userService.getUserByEmail(signUpRequest.getEmail());
        if (userService.hasUserWithEmail(signUpRequest.getEmail())) {
            System.out.println(String.format("Email %s already been used", signUpRequest.getEmail()));
            throw new DuplicatedUserInfoException(String.format("Email %s already been used", signUpRequest.getEmail()));
        }

        UserDto newUser = new UserDto(signUpRequest.getEmail(), signUpRequest.getFullName(), USER, signUpRequest.getPassword());
        if(!userService.existsByRole(ADMIN))
            newUser.setRole(ADMIN);
        userService.saveUser(newUser);
        String token = authenticationService.authenticateAndGetToken(signUpRequest.getEmail(), signUpRequest.getPassword());
        return new AuthResponse(token);
    }
}
