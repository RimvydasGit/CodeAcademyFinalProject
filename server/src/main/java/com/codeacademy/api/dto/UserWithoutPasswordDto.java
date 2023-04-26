package com.codeacademy.api.dto;

import java.time.ZonedDateTime;
import java.util.List;

public record UserWithoutPasswordDto(Long id, String email, String fullName, String role, List<OrderDto> orders) {




    public record OrderDto(String id,String indicationBulb, String description, ZonedDateTime createdAt) {
    }
}
