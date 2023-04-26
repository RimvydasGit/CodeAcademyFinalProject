package com.codeacademy.api.dto;

import java.time.ZonedDateTime;

public record OrderDto(String id, String indicationBulb, String description, ZonedDateTime createdAt, OrderDto.UserDto user) {




    public record UserDto(String email, String fullName) {
    }
}
