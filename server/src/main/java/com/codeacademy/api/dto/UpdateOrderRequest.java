package com.codeacademy.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateOrderRequest {
    private String indicationBulb;
    @NotBlank
    private String description;

    public UpdateOrderRequest(String newDescription) {
    }


}
