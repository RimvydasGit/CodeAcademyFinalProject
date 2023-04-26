package com.codeacademy.api.exception;

import lombok.Data;

@Data
public class CustomErrorResponse {
    private int statusCode;
    private String errorMessage;

    public CustomErrorResponse(int statusCode, String errorMessage) {
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
    }
}
