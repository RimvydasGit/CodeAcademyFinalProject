package com.codeacademy.api.services;

import com.codeacademy.api.dto.UserDto;
import com.codeacademy.api.dto.UserWithoutPasswordDto;
import com.codeacademy.api.entities.MyUser;
import com.codeacademy.api.mapper.UserMapper;
import com.codeacademy.api.repositories.UserRepository;
import io.micrometer.common.util.StringUtils;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.codeacademy.api.utils.Roles.ADMIN;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;


    @Override
    public void saveUser(@NotNull @Valid UserDto userDto ) {
        MyUser user = new MyUser();
        user.setFullName(userDto.getFullName());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole(userDto.getRole());
        userRepository.save(user);
    }
    @Override
    public UserDto createUser(@NotNull @Valid UserDto userDto){
        MyUser user = new MyUser();
        user.setFullName(userDto.getFullName());
        user.setRole(userDto.getRole());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userRepository.save(user);
        BeanUtils.copyProperties(user, userDto);
        userDto.setPassword(null);
        return userDto;
    }
    @Override
    public UserDto updateUserById( @NotNull Long id, @NotNull @Valid UserDto userDto ) {
        Optional<MyUser> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User with id " + id + " not found");
        }
        MyUser user = optionalUser.get();
        user.setFullName(userDto.getFullName());
        user.setEmail(userDto.getEmail());
        if(StringUtils.isNotEmpty(userDto.getPassword())) {
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }
        user.setRole(userDto.getRole());
        userRepository.save(user);
        UserDto savedUserDto = new UserDto();
        BeanUtils.copyProperties(user, savedUserDto);
        savedUserDto.setPassword(null);
        return savedUserDto;
    }

    @Override
    public UserDto updateUserByEmail( String email, @NotNull @Valid UserDto userDto ) {
        Optional<MyUser> optionalUser = Optional.ofNullable(userRepository.findByEmail(email));
        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User with email " + email + " not found");
        }
        MyUser user = optionalUser.get();
        user.setFullName(userDto.getFullName());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole(userDto.getRole());
        userRepository.save(user);
        UserDto savedUserDto = new UserDto();
        BeanUtils.copyProperties(user, savedUserDto);
        savedUserDto.setPassword(null);
        return savedUserDto;
    }

    @Override
    public boolean deleteUserById( Long id ) {
        if(userRepository.countByRole(ADMIN) == 1
                && userRepository.findById(id).get().getRole().equals(ADMIN)) {
            throw new IllegalStateException("Cannot delete the last admin user");
        }
        Optional<MyUser> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User with id " + id + " not found");
        }
        MyUser user = optionalUser.get();
        userRepository.delete(user);
        return true;
    }
    @Override
    public boolean deleteUserByEmail( String email ) {
        if(userRepository.countByRole(ADMIN) == 1
                && userRepository.findByEmail(email).getRole().equals(ADMIN)) {
            throw new IllegalStateException("Cannot delete the last admin user");
        }
        Optional<MyUser> optionalUser = Optional.ofNullable(userRepository.findByEmail(email));
        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User with email " + email + " not found");
        }
        MyUser user = optionalUser.get();
        userRepository.delete(user);
        return true;
    }

    @Override
    public MyUser getUserByEmail( String email ) {
        return userRepository.findByEmail(email);
    }
    @Override
    public MyUser getUserById( Long id ) {
        return userRepository.findById(id).get();
    }

    @Override
    public boolean hasUserWithEmail( String email ) {
        return userRepository.existsByEmail(email);
    }
    @Override
    public List<UserWithoutPasswordDto> getUsers() {
        List<MyUser> users = userRepository.findAll();
        return users.stream()
                .map(userMapper::toUserWithoutPasswordDto)
                .collect(Collectors.toList());
    }
    @Override
    public boolean existsByRole(String role) {
        return userRepository.existsByRole(role);
    }
}
