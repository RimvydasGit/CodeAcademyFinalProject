package com.codeacademy.api.controllers;

import com.codeacademy.api.exception.CustomErrorResponse;
import com.codeacademy.api.exception.DuplicatedUserInfoException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandlerController {
    @ExceptionHandler(DuplicatedUserInfoException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public CustomErrorResponse handleDuplicatedUserInfoException( DuplicatedUserInfoException ex) {
        return new CustomErrorResponse(HttpStatus.CONFLICT.value(), ex.getMessage());
    }
}
