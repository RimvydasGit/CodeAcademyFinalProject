package com.codeacademy.api.mapper;


import com.codeacademy.api.dto.UserWithoutPasswordDto;
import com.codeacademy.api.entities.MyUser;

public interface UserMapper {

    UserWithoutPasswordDto toUserWithoutPasswordDto( MyUser user);
}
