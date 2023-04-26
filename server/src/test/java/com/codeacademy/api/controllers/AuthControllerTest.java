package com.codeacademy.api.controllers;

import com.codeacademy.api.dto.AuthResponse;
import com.codeacademy.api.dto.LoginRequest;
import com.codeacademy.api.dto.SignUpRequest;
import com.codeacademy.api.dto.UserDto;
import com.codeacademy.api.exception.DuplicatedUserInfoException;
import com.codeacademy.api.services.AuthenticationService;
import com.codeacademy.api.services.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.Mockito.*;

class AuthControllerTest {

    private AuthController authController;

    @Mock
    private UserService userService;

    @Mock
    private AuthenticationService authenticationService;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        authController = new AuthController(userService, authenticationService);
    }

    @Test
    void login_Should_ReturnToken_When_AuthenticationIsSuccessful() {
        String email = "user@example.com";
        String password = "password";
        String token = "token";
        LoginRequest loginRequest = new LoginRequest(email, password);

        when(authenticationService.authenticateAndGetToken(email, password)).thenReturn(token);

        AuthResponse result = authController.login(loginRequest);

        verify(authenticationService, times(1)).authenticateAndGetToken(email, password);

        Assertions.assertEquals(token, result.accessToken());
    }

    @Test
    void signUp_Should_ReturnToken_When_UserIsCreatedAndAuthenticated() {
        String email = "user@example.com";
        String password = "Password1!";
        String fullName = "John Doe";
        SignUpRequest signUpRequest = new SignUpRequest(email, fullName, password);

        when(userService.hasUserWithEmail(email)).thenReturn(false);
        when(authenticationService.authenticateAndGetToken(email, password)).thenReturn("token");

        AuthResponse result = authController.signUp(signUpRequest);

        verify(userService, times(1)).hasUserWithEmail(email);
        verify(userService, times(1)).saveUser(any(UserDto.class));
        verify(authenticationService, times(1)).authenticateAndGetToken(email, password);

        //   Assertions.assertEquals(HttpStatus.CREATED.value(), result.getStatus());
        Assertions.assertEquals("token", result.accessToken());
    }

    @Test
    void signUp_Should_ThrowException_When_UserWithEmailAlreadyExists() {
        String email = "user@example.com";
        String password = "password";
        String fullName = "John Doe";
        SignUpRequest signUpRequest = new SignUpRequest(email, password, fullName);

        when(userService.hasUserWithEmail(email)).thenReturn(true);

        Assertions.assertThrows(DuplicatedUserInfoException.class, () -> authController.signUp(signUpRequest));

        verify(userService, times(1)).hasUserWithEmail(email);
        verify(userService, never()).saveUser(any(UserDto.class));
        verify(authenticationService, never()).authenticateAndGetToken(email, password);
    }
}