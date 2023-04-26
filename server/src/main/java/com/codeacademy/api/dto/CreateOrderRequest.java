package com.codeacademy.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class CreateOrderRequest {
        @NotBlank
        private String indicationBulb;
        @NotBlank
        private String description;

        public CreateOrderRequest(String description) {

        }

    }
