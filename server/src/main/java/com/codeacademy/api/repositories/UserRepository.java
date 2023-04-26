package com.codeacademy.api.repositories;

import com.codeacademy.api.entities.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<MyUser, Long> {
    MyUser findByEmail( String email);
    boolean existsByEmail(String email);
    boolean existsByRole(String role);
    Long countByRole(String role);
}
