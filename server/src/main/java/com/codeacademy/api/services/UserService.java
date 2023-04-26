package com.codeacademy.api.services;

import com.codeacademy.api.dto.UserDto;
import com.codeacademy.api.dto.UserWithoutPasswordDto;
import com.codeacademy.api.entities.MyUser;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    UserDto createUser(@NotNull @Valid UserDto userDto);
    void saveUser( UserDto userDto );
    UserDto updateUserById( @NotNull Long id, @NotNull @Valid UserDto userDto);
    UserDto updateUserByEmail(@NotNull String email, @NotNull @Valid UserDto userDto );
    boolean deleteUserById( @NotNull Long id);
    boolean deleteUserByEmail( String email );

    MyUser getUserByEmail( String email );

    MyUser getUserById( Long id );

    boolean hasUserWithEmail( String email );
    List<UserWithoutPasswordDto> getUsers();

    boolean existsByRole( String role );
}
