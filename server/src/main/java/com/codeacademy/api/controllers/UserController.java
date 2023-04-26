package com.codeacademy.api.controllers;

import com.codeacademy.api.dto.UserDto;
import com.codeacademy.api.dto.UserWithoutPasswordDto;
import com.codeacademy.api.entities.MyUser;
import com.codeacademy.api.mapper.UserMapper;
import com.codeacademy.api.security.CustomUserDetails;
import com.codeacademy.api.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.codeacademy.api.utils.Roles.ADMIN;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;



    @GetMapping
    public List<UserWithoutPasswordDto> getUsers() {
        return userService.getUsers();
    }
    @GetMapping("/me")
    public UserWithoutPasswordDto getCurrentUser(@AuthenticationPrincipal CustomUserDetails currentUser) {
        return userMapper.toUserWithoutPasswordDto(userService.getUserByEmail(currentUser.getUsername()));
    }
    @PutMapping("/me")
    public UserWithoutPasswordDto updateCurrentUser(@AuthenticationPrincipal CustomUserDetails currentUser, @RequestBody UserDto updatedUserDto) {
        userService.updateUserByEmail(currentUser.getUsername(), updatedUserDto);
        MyUser myUser = userService.getUserByEmail(updatedUserDto.getEmail());
        return userMapper.toUserWithoutPasswordDto(myUser);
    }
    @GetMapping("/{email}")
    @PreAuthorize("hasAuthority('" + ADMIN + "')")
    public UserWithoutPasswordDto getUser( @PathVariable String email) {
        return userMapper.toUserWithoutPasswordDto(userService.getUserByEmail(email));
    }
    @GetMapping("/id/{id}")
    @PreAuthorize("hasAuthority('" + ADMIN + "')")
    public UserWithoutPasswordDto getUser( @PathVariable Long id) {
        return userMapper.toUserWithoutPasswordDto(userService.getUserById(id));
    }
    @PostMapping
    @PreAuthorize("(@userRepository.existsByRole('ADMIN') == false) or hasAuthority('" + ADMIN + "')")
    public ResponseEntity<UserDto> createUser( @Valid @RequestBody UserDto userDto ){
        UserDto savedUser = userService.createUser(userDto);
        return ResponseEntity.ok(savedUser);
    }
    @PutMapping("/id/{id}")
    @PreAuthorize("hasAuthority('" + ADMIN + "')")
    public ResponseEntity<UserDto> updateUserById( @PathVariable Long id,
                                                   @Valid @RequestBody UserDto userDto){
        userDto = userService.updateUserById(id, userDto);
        return ResponseEntity.ok(userDto);
    }
    @PutMapping("/{email}")
    @PreAuthorize("hasAuthority('" + ADMIN + "')")
    public ResponseEntity<UserDto> updateUserByEmail(@PathVariable String email,
                                                     @Valid @RequestBody UserDto userDto){
        userDto = userService.updateUserByEmail(email, userDto);
        return ResponseEntity.ok(userDto);
    }
    @DeleteMapping("/id/{id}")
    @PreAuthorize("hasAuthority('" + ADMIN + "')")
    public ResponseEntity<Map<String, Boolean>> deleteUserById( @PathVariable Long id){
        boolean deleted = userService.deleteUserById(id);
        if (deleted) {
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", true);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{email}")
    @PreAuthorize("hasAuthority('" + ADMIN + "')")
    public ResponseEntity<Map<String, Boolean>> deleteUserByEmail(@PathVariable String email){
        boolean deleted = userService.deleteUserByEmail(email);
        if (deleted) {
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", true);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/adminExists")
//    @PreAuthorize("(@userService.existsByRole('ADMIN') == false) or hasAuthority('" + ADMIN + "')")
    public ResponseEntity<Boolean> adminExists() {
        boolean exists = userService.existsByRole(ADMIN);
        return ResponseEntity.ok(exists);
    }
}
