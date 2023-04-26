package com.codeacademy.api.controllers;

import com.codeacademy.api.exception.CustomErrorResponse;
import com.codeacademy.api.exception.DuplicatedUserInfoException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ExceptionHandlerControllerTest {

    @Mock
    private DuplicatedUserInfoException exception;

    @InjectMocks
    private ExceptionHandlerController controller;

    @Test
    public void testHandleDuplicatedUserInfoException() {
        when(exception.getMessage()).thenReturn("User info already exists");

        CustomErrorResponse response = controller.handleDuplicatedUserInfoException(exception);

        assertEquals(HttpStatus.CONFLICT.value(), response.getStatusCode());
        assertEquals("User info already exists", response.getErrorMessage());
    }
}