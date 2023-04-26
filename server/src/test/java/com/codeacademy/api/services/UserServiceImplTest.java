package com.codeacademy.api.services;

import com.codeacademy.api.dto.UserDto;
import com.codeacademy.api.dto.UserWithoutPasswordDto;
import com.codeacademy.api.entities.MyUser;
import com.codeacademy.api.mapper.UserMapper;
import com.codeacademy.api.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.codeacademy.api.utils.Roles.ADMIN;
import static com.codeacademy.api.utils.Roles.USER;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveUser_Should_SaveUser_When_ValidUserDtoProvided() {
        // given
        UserDto userDto = new UserDto();
        userDto.setFullName("John Doe");
        userDto.setEmail("john.doe@example.com");
        userDto.setPassword("password");
        userDto.setRole("USER");

        when(passwordEncoder.encode(userDto.getPassword())).thenReturn("encodedPassword");

        // when
        userService.saveUser(userDto);

        // then
        verify(userRepository).save(any(MyUser.class));
    }

    @Test
    void createUser_Should_ReturnSavedUser_When_ValidUserDtoProvided() {
        // given
        UserDto userDto = new UserDto();
        userDto.setFullName("John Doe");
        userDto.setEmail("john.doe@example.com");
        userDto.setPassword("password");
        userDto.setRole("USER");

        MyUser savedUser = new MyUser();
        savedUser.setId(1L);
        savedUser.setFullName(userDto.getFullName());
        savedUser.setEmail(userDto.getEmail());
        savedUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        savedUser.setRole(userDto.getRole());

        when(userRepository.save(any(MyUser.class))).thenReturn(savedUser);


        // when
        UserDto result = userService.createUser(userDto);

        // then
        assertEquals(userDto.getFullName(), result.getFullName());
        assertEquals(userDto.getEmail(), result.getEmail());
        assertEquals(userDto.getRole(), result.getRole());
        assertNull(result.getPassword());
    }

    @Test
    void testUpdateUserById() {
        // Create a test user object and DTO
        MyUser testUser = new MyUser();
        testUser.setId(1L);
        testUser.setFullName("Test User");
        testUser.setEmail("testuser@example.com");
        testUser.setPassword("password");
        testUser.setRole("USER");

        UserDto testUserDto = new UserDto();
        testUserDto.setId(1L);
        testUserDto.setFullName("Updated User");
        testUserDto.setEmail("updateduser@example.com");
        testUserDto.setPassword("newpassword");
        testUserDto.setRole("ADMIN");

        // Mock the userRepository.findById method to return the test user
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(testUser));

        // Mock the passwordEncoder.encode method to return the hashed password
        when(passwordEncoder.encode(anyString())).thenReturn("hashedPassword");

        // Mock the userRepository.save method to return the saved user
        when(userRepository.save(any(MyUser.class))).thenReturn(testUser);

        // Call the updateUserById method with the test user ID and DTO
        UserDto updatedUserDto = userService.updateUserById(1L, testUserDto);

        // Verify that the userRepository.findById method was called once with the correct ID
        verify(userRepository, times(1)).findById(1L);

        // Verify that the userRepository.save method was called once with the correct user
        verify(userRepository, times(1)).save(testUser);


        // Verify that the saved user DTO matches the expected values
        assertNotNull(updatedUserDto);
        assertEquals(testUserDto.getId(), updatedUserDto.getId());
        assertEquals(testUserDto.getFullName(), updatedUserDto.getFullName());
        assertEquals(testUserDto.getEmail(), updatedUserDto.getEmail());
        assertEquals(testUserDto.getRole(), updatedUserDto.getRole());
        assertNull(updatedUserDto.getPassword());
    }

    @Test
    void testUpdateUserByIdWhenUserNotFound() {
        // Mock the userRepository.findById method to return an empty Optional
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());

        // Call the updateUserById method with a non-existent user ID
        assertThrows(IllegalArgumentException.class, () -> userService.updateUserById(1L, new UserDto()));

        // Verify that the userRepository.findById method was called once with the correct ID
        verify(userRepository, times(1)).findById(1L);

        // Verify that the userRepository.save and userMapper.toDto methods were not called
        verify(userRepository, never()).save(any(MyUser.class));
        verify(userMapper, never()).toUserWithoutPasswordDto(any(MyUser.class));
    }

    @Test
    void testUpdateUserByEmailSuccess() {
        // Setup
        String email = "test@example.com";
        UserDto userDto = new UserDto();
        userDto.setFullName("John Doe");
        userDto.setEmail(email);
        userDto.setPassword("password123");
        userDto.setRole(USER);

        MyUser myUser = new MyUser();
        myUser.setFullName("Jane Smith");
        myUser.setEmail(email);
        myUser.setPassword("oldPassword");
        myUser.setRole(ADMIN);

        when(userRepository.findByEmail(email)).thenReturn(myUser);
        when(passwordEncoder.encode(userDto.getPassword())).thenReturn("newPassword");
        when(userRepository.save(any(MyUser.class))).thenReturn(myUser);


        // Execute
        UserDto result = userService.updateUserByEmail(email, userDto);

        // Verify
        assertNotNull(result);
        assertEquals(userDto.getFullName(), result.getFullName());
        assertEquals(userDto.getEmail(), result.getEmail());
        assertNull(result.getPassword());
        assertEquals(userDto.getRole(), result.getRole());
        verify(userRepository).findByEmail(email);
        verify(passwordEncoder).encode(userDto.getPassword());
        verify(userRepository).save(myUser);

    }

    @Test
    void testUpdateUserByEmailUserNotFound() {
        // Setup
        String email = "test@example.com";
        UserDto userDto = new UserDto();
        userDto.setFullName("John Doe");
        userDto.setEmail(email);
        userDto.setPassword("password123");
        userDto.setRole(USER);

        when(userRepository.findByEmail(email)).thenReturn(null);

        // Execute and Verify
        assertThrows(IllegalArgumentException.class, () -> userService.updateUserByEmail(email, userDto));
        verify(userRepository).findByEmail(email);
        verifyNoMoreInteractions(userRepository, passwordEncoder, userMapper);
    }

    @Test
    void testDeletePersonByIdWhenPersonExists() {
        Long id = 1L;
        MyUser user = new MyUser();
        user.setId(id);
        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        doNothing().when(userRepository).delete(user);
        boolean result = userService.deleteUserById(id);
        assertTrue(result);
        verify(userRepository, times(1)).findById(id);
        verify(userRepository, times(1)).delete(user);
    }

    @Test
    void testDeletePersonByIdWhenPersonNotFound() {
        Long id = 1L;
        when(userRepository.findById(id)).thenReturn(Optional.empty());
        assertThrows(IllegalArgumentException.class, () -> userService.deleteUserById(id));
        verify(userRepository, times(1)).findById(id);
        verify(userRepository, never()).delete(any(MyUser.class));
    }
    @Test
    public void testDeletePersonByEmailWhenUserExists() {
        // Mock the userRepository.findByEmail method to return a non-empty Optional
        when(userRepository.findByEmail(anyString())).thenReturn(new MyUser());

        // Call the deletePersonByEmail method with an existing user email
        boolean result = userService.deleteUserByEmail("test@example.com");

        // Verify that the userRepository.findByEmail and userRepository.delete methods were called once
        verify(userRepository, times(1)).findByEmail("test@example.com");
        verify(userRepository, times(1)).delete(any(MyUser.class));

        // Assert that the result is true
        assertTrue(result);
    }

    @Test
    public void testDeletePersonByEmailWhenUserNotFound() {
        // Mock the userRepository.findByEmail method to return an empty Optional
        when(userRepository.findByEmail(anyString())).thenReturn(null);

        // Call the deletePersonByEmail method with a non-existent user email
        assertThrows(IllegalArgumentException.class, () -> userService.deleteUserByEmail("test@example.com"));

        // Verify that the userRepository.findByEmail method was called once with the correct email
        verify(userRepository, times(1)).findByEmail("test@example.com");

        // Verify that the userRepository.delete method was not called
        verify(userRepository, never()).delete(any(MyUser.class));
    }
    @Test
    public void testGetUserByEmail() {
        // Create a user with a specific email
        String email = "test@example.com";
        MyUser user = new MyUser();
        user.setId(1L);
        user.setFullName("Test User");
        user.setEmail(email);
        user.setPassword("password");
        user.setRole(USER);

        // Mock the userRepository.findByEmail method to return the user
        when(userRepository.findByEmail(email)).thenReturn(user);

        // Call the getUserByEmail method with the email of the user we created
        MyUser returnedUser = userService.getUserByEmail(email);

        // Verify that the userRepository.findByEmail method was called once with the correct email
        verify(userRepository, times(1)).findByEmail(email);

        // Verify that the returned user is the same as the one we created
        assertEquals(user, returnedUser);
    }

    @Test
    public void testGetUserByEmailWhenUserNotFound() {
        // Mock the userRepository.findByEmail method to return null
        when(userRepository.findByEmail(anyString())).thenReturn(null);

        // Call the getUserByEmail method with a non-existent email
        MyUser returnedUser = userService.getUserByEmail("nonexistent@example.com");

        // Verify that the userRepository.findByEmail method was called once with the correct email
        verify(userRepository, times(1)).findByEmail("nonexistent@example.com");

        // Verify that the returned user is null
        assertNull(returnedUser);
    }
    @Test
    public void testGetUserById() {
        // Set up the mock repository to return a MyUser object with ID 1 when called with ID 1
        MyUser user = new MyUser();
        user.setId(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        // Call the getUserById method with ID 1
        MyUser result = userService.getUserById(1L);

        // Verify that the userRepository.findById method was called once with the correct ID
        verify(userRepository, times(1)).findById(1L);

        // Verify that the returned user is the same as the mock user
        assertEquals(user, result);
    }

    @Test
    public void testGetUserByIdWhenUserNotFound() {
        // Set up the mock repository to return an empty Optional when called with ID 1
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        // Call the getUserById method with ID 1
        assertThrows(NoSuchElementException.class, () -> userService.getUserById(1L));

        // Verify that the userRepository.findById method was called once with the correct ID
        verify(userRepository, times(1)).findById(1L);
    }
    @Test
    public void testHasUserWithEmailReturnsTrue() {
        // Mock the UserRepository.existsByEmail method to return true
        when(userRepository.existsByEmail("test@test.com")).thenReturn(true);

        // Call the hasUserWithEmail method with an existing email address
        boolean result = userService.hasUserWithEmail("test@test.com");

        // Verify that the UserRepository.existsByEmail method was called once with the correct email address
        verify(userRepository, times(1)).existsByEmail("test@test.com");

        // Verify that the result is true
        assertTrue(result);
    }

    @Test
    public void testHasUserWithEmailReturnsFalse() {
        // Mock the UserRepository.existsByEmail method to return false
        when(userRepository.existsByEmail("test@test.com")).thenReturn(false);

        // Call the hasUserWithEmail method with a non-existent email address
        boolean result = userService.hasUserWithEmail("test@test.com");

        // Verify that the UserRepository.existsByEmail method was called once with the correct email address
        verify(userRepository, times(1)).existsByEmail("test@test.com");

        // Verify that the result is false
        assertFalse(result);
    }
    @Test
    public void testGetUsers() {
        // Create a list of MyUser objects
        List<MyUser> users = new ArrayList<>();
        users.add(new MyUser( "john.doe@example.com", "John Doe", "labas12","CUSTOMER"));
        users.add(new MyUser("jane.doe@example.com", "Jane Doe", "labas12","ADMIN"));

        // Create a list of UserWithoutPasswordDto objects
        List<UserWithoutPasswordDto> userDtos = users.stream()
                .map(userMapper::toUserWithoutPasswordDto)
                .collect(Collectors.toList());

        // Mock the userRepository.findAll method to return the list of MyUser objects
        when(userRepository.findAll()).thenReturn(users);

        // Mock the userMapper.toUserWithoutPasswordDto method to return the list of UserWithoutPasswordDto objects
        when(userMapper.toUserWithoutPasswordDto(users.get(0))).thenReturn(userDtos.get(0));
        when(userMapper.toUserWithoutPasswordDto(users.get(1))).thenReturn(userDtos.get(1));

        // Call the getUsers method
        List<UserWithoutPasswordDto> result = userService.getUsers();

        // Verify that the userRepository.findAll method was called once
        verify(userRepository, times(1)).findAll();


        // Verify that the result of the getUsers method is equal to the expected list of UserWithoutPasswordDto objects
        assertEquals(userDtos, result);
    }
}
