package com.codeacademy.api.controllers;

import com.codeacademy.api.dto.UserDto;
import com.codeacademy.api.dto.UserWithoutPasswordDto;
import com.codeacademy.api.entities.MyUser;
import com.codeacademy.api.security.CustomUserDetails;
import com.codeacademy.api.services.UserService;
import com.codeacademy.api.mapper.UserMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static com.codeacademy.api.utils.Roles.ADMIN;
import static org.assertj.core.api.Assertions.assertThat;

import org.springframework.security.test.context.support.WithMockUser;
import static org.mockito.Mockito.*;


import java.util.*;

import static com.codeacademy.api.utils.Roles.USER;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    private UserMapper userMapper;
    @InjectMocks
    private UserController userController;
    private UserService userService;

    private UserWithoutPasswordDto userWithoutPasswordDto;

    @BeforeEach
    public void setup() {
        userService = mock(UserService.class);
        userMapper = mock(UserMapper.class);
        userController = new UserController(userService, userMapper);
    }

    @Test
    public void getUsers_shouldReturnListOfUserWithoutPasswordDto() {
        // Arrange
        List<UserWithoutPasswordDto> userDtoList = new ArrayList<>();
        UserWithoutPasswordDto userDto = new UserWithoutPasswordDto(1L, "user@example.com", "John Doe", "USER", new ArrayList<>());
        userDtoList.add(userDto);
        when(userService.getUsers()).thenReturn(userDtoList);

        // Act
        List<UserWithoutPasswordDto> result = userController.getUsers();

        // Assert
        assertEquals(userDtoList, result);
    }

    @Test
    public void getCurrentUser_shouldReturnUserWithoutPasswordDto() {
        // Arrange
        CustomUserDetails currentUser = new CustomUserDetails("test@example.com", "password", "ROLE_USER");
        MyUser myUser = new MyUser();
        when(userService.getUserByEmail(currentUser.getUsername())).thenReturn(myUser);
        UserWithoutPasswordDto userDto = new UserWithoutPasswordDto(1L, "test@example.com", "John Doe", "USER", new ArrayList<>());
        when(userMapper.toUserWithoutPasswordDto(myUser)).thenReturn(userDto);

        // Act
        UserWithoutPasswordDto result = userController.getCurrentUser(currentUser);

        // Assert
        assertEquals(userDto, result);
    }
    @Test
    public void updateCurrentUser_shouldReturnUpdatedUser() {
        // Arrange
        CustomUserDetails currentUser = new CustomUserDetails("test@example.com", "password","ROLE_USER");
        UserDto updatedUserDto = new UserDto("updated@example.com", "John Doe", "USER");
        MyUser updatedUser = new MyUser();
        when(userService.getUserByEmail(updatedUserDto.getEmail())).thenReturn(updatedUser);
        UserWithoutPasswordDto userDto = new UserWithoutPasswordDto(1L, "test@example.com", "John Doe", "USER", new ArrayList<>());
        when(userMapper.toUserWithoutPasswordDto(updatedUser)).thenReturn(userDto);

        // Act
        UserWithoutPasswordDto result = userController.updateCurrentUser(currentUser, updatedUserDto);

        // Assert
        verify(userService).updateUserByEmail(currentUser.getUsername(), updatedUserDto);
        verify(userService).getUserByEmail(updatedUserDto.getEmail());
        verify(userMapper).toUserWithoutPasswordDto(updatedUser);
        assertEquals(userDto, result);
    }
    @Test
    void testGetUserByEmail() {
        // given
        String email = "test@example.com";
        when(userService.getUserByEmail(email)).thenReturn(new MyUser());
        when(userMapper.toUserWithoutPasswordDto(any())).thenReturn(userWithoutPasswordDto);

        // when
        UserWithoutPasswordDto result = userController.getUser(email);

        // then
        verify(userService).getUserByEmail(email);
        verify(userMapper).toUserWithoutPasswordDto(any());
    }

    @Test
    void testGetUserById() {
        // given
        Long id = 1L;
        when(userService.getUserById(id)).thenReturn(new MyUser());
        when(userMapper.toUserWithoutPasswordDto(any())).thenReturn(userWithoutPasswordDto);

        // when
        UserWithoutPasswordDto result = userController.getUser(id);

        // then
        verify(userService).getUserById(id);
        verify(userMapper).toUserWithoutPasswordDto(any());
    }

    @Test
    public void createUser_shouldReturnSavedUser() {
        // given
        UserDto userDto = new UserDto();
        userDto.setEmail("test@example.com");
        userDto.setPassword("password123");
        userDto.setFullName("Test User");
        userDto.setRole(USER);

        MyUser myUser = new MyUser();
        myUser.setId(1L);
        myUser.setEmail("test@example.com");
        myUser.setPassword("password123");
        myUser.setFullName("Test User");
        myUser.setRole(USER);


        when(userService.createUser(userDto)).thenReturn(userDto);

        // when
        ResponseEntity<UserDto> response = userController.createUser(userDto);

        // then
        assertEquals(userDto, response.getBody());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void updateUserByIdShouldReturnUpdatedUserDto() {
        UserDto userDto = new UserDto(1L, "test@test.com", "Test User", "USER", "password");
        when(userService.updateUserById(eq(1L), any(UserDto.class))).thenReturn(userDto);

        ResponseEntity<UserDto> responseEntity = userController.updateUserById(1L, userDto);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(userDto, responseEntity.getBody());
        verify(userService, times(1)).updateUserById(eq(1L), any(UserDto.class));
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void updateUserByEmailShouldReturnUpdatedUserDto() {
        UserDto userDto = new UserDto(1L, "test@test.com", "Test User", "USER", "password");
        when(userService.updateUserByEmail(eq("test@test.com"), any(UserDto.class))).thenReturn(userDto);

        ResponseEntity<UserDto> responseEntity = userController.updateUserByEmail("test@test.com", userDto);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(userDto, responseEntity.getBody());
        verify(userService, times(1)).updateUserByEmail(eq("test@test.com"), any(UserDto.class));
    }
    @Test
    @DisplayName("Test deleteUserById method with valid input")
    public void testDeleteUserByIdSuccess() {
        Long userId = 1L;
        when(userService.deleteUserById(userId)).thenReturn(true);

        ResponseEntity<Map<String, Boolean>> response = userController.deleteUserById(userId);

        verify(userService, times(1)).deleteUserById(userId);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().get("deleted")).isEqualTo(true);
    }
    @Test
    @DisplayName("Test deleteUserById method with invalid input")
    public void testDeleteUserByIdNotFound() {
        Long userId = 1L;
        when(userService.deleteUserById(userId)).thenReturn(false);

        ResponseEntity<Map<String, Boolean>> response = userController.deleteUserById(userId);

        verify(userService, times(1)).deleteUserById(userId);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }
    @Test
    public void testDeleteUserByEmailSuccess() {
        // Arrange
        String email = "test@example.com";
        boolean isDeleted = true;
        when(userService.deleteUserByEmail(email)).thenReturn(isDeleted);

        Map<String, Boolean> expectedResponse = new HashMap<>();
        expectedResponse.put("deleted", true);

        // Act
        ResponseEntity<Map<String, Boolean>> responseEntity = userController.deleteUserByEmail(email);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResponse, responseEntity.getBody());
    }

    @Test
    public void testDeleteUserByEmailNotFound() {
        // Arrange
        String email = "test@example.com";
        boolean isDeleted = false;
        when(userService.deleteUserByEmail(email)).thenReturn(isDeleted);

        // Act
        ResponseEntity<Map<String, Boolean>> responseEntity = userController.deleteUserByEmail(email);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());

    }

    @Test
    @DisplayName("Check if admin exists")
    public void testAdminExists() {
        // Arrange
        Mockito.when(userService.existsByRole(ADMIN)).thenReturn(true);

        // Act
        ResponseEntity<Boolean> responseEntity = userController.adminExists();

        // Assert
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertTrue(responseEntity.getBody());
    }
}
