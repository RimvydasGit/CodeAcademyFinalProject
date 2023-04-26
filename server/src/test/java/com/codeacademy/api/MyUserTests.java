package com.codeacademy.api;

import com.codeacademy.api.entities.MyUser;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class MyUserTests {
    @Autowired
    private EntityManager entityManager;
    @Test
    void testMyUserConstructor() {
        String email = "test@example.com";
        String fullName = "Test User";
        String password = "password";
        String role = "USER";

        MyUser user = new MyUser(email, fullName, password, role);

        assertEquals(email, user.getEmail());
        assertEquals(fullName, user.getFullName());
        assertEquals(password, user.getPassword());
        assertEquals(role, user.getRole());
    }


}
