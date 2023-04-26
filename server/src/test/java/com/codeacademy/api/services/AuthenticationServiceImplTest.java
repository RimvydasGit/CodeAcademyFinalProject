package com.codeacademy.api.services;

import com.codeacademy.api.security.TokenProvider;
import com.codeacademy.api.services.AuthenticationServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.mockito.Mockito.*;

class AuthenticationServiceImplTest {

    private AuthenticationServiceImpl authenticationService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private TokenProvider tokenProvider;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        authenticationService = new AuthenticationServiceImpl(authenticationManager, tokenProvider);
    }

    @Test
    void authenticateAndGetToken_Should_ReturnToken_When_AuthenticationIsSuccessful() {
        String username = "user";
        String password = "pass";
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, password);
        String token = "token";

        when(authenticationManager.authenticate(authentication)).thenReturn(authentication);
        when(tokenProvider.generateJwtToken(authentication)).thenReturn(token);

        String result = authenticationService.authenticateAndGetToken(username, password);

        verify(authenticationManager, times(1)).authenticate(authentication);
        verify(tokenProvider, times(1)).generateJwtToken(authentication);

        Assertions.assertEquals(token, result);
    }

    @Test
    void authenticateAndGetToken_Should_ThrowException_When_AuthenticationFails() {
        String username = "user";
        String password = "pass";
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, password);

        when(authenticationManager.authenticate(authentication)).thenThrow(new RuntimeException());

        Assertions.assertThrows(RuntimeException.class, () -> authenticationService.authenticateAndGetToken(username, password));
    }
}