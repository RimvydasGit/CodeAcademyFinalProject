package com.codeacademy.api.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class IndicationBulbValidator implements ConstraintValidator<ValidIndicationBulb, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }
        return value.equals("OPEN") || value.equals("ONGOING") || value.equals("FINISHED");
    }
}
