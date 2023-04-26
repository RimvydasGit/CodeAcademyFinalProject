package com.codeacademy.api.services;

public interface AuthenticationService {
    String authenticateAndGetToken(String username, String password);
}
