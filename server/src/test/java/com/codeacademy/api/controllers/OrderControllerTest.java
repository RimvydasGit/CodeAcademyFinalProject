package com.codeacademy.api.controllers;

import com.codeacademy.api.dto.OrderDto;
import com.codeacademy.api.dto.UpdateOrderRequest;
import com.codeacademy.api.entities.MyUser;
import com.codeacademy.api.entities.Order;
import com.codeacademy.api.mapper.OrderMapper;
import com.codeacademy.api.services.OrderService;
import com.codeacademy.api.services.UserService;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import com.codeacademy.api.dto.CreateOrderRequest;

import com.codeacademy.api.security.CustomUserDetails;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.*;
import java.time.ZonedDateTime;
import java.util.UUID;
import org.mockito.MockitoAnnotations;
import org.junit.jupiter.api.extension.ExtendWith;



import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.test.web.servlet.MockMvc;

import org.springframework.test.web.servlet.setup.MockMvcBuilders;



import java.util.Collections;
import java.util.List;


import static org.junit.jupiter.api.Assertions.assertEquals;
@DisplayName("OrderController Unit Tests")
@ExtendWith(MockitoExtension.class)
public class OrderControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private OrderService orderService;

    @Mock
    private OrderMapper orderMapper;
    @Mock
    private CustomUserDetails currentUser;


    private OrderController orderController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        orderController = new OrderController(userService, orderService, orderMapper);
        mockMvc = MockMvcBuilders.standaloneSetup(orderController).build();
    }


    @Test
    public void testGetOrders() {
        // Given
        Order order = new Order(UUID.randomUUID().toString(), "Test Order");
        order.setCreatedAt(ZonedDateTime.now());
        MyUser user = new MyUser("testuser@example.com", "Test User", "testpassword");
        order.setUser(user);
        List<Order> orders = Collections.singletonList(order);
        OrderDto orderDto = new OrderDto(order.getId(), order.getIndicationBulb(), order.getDescription(), order.getCreatedAt(),
                new OrderDto.UserDto(user.getEmail(), user.getFullName()));
        when(orderService.getOrders()).thenReturn(orders);
        when(orderMapper.toOrderDto(order)).thenReturn(orderDto);
        OrderController orderController = new OrderController(userService, orderService, orderMapper);

        // When
        List<OrderDto> result = orderController.getOrders();

        // Then
        verify(orderService, times(1)).getOrders();
        verify(orderMapper, times(1)).toOrderDto(order);
        assertEquals(orders.size(), result.size());
        assertEquals(orderDto, result.get(0));
    }


    @Test
    void createOrder_shouldReturnOrderDto() {
        // given
        CreateOrderRequest createOrderRequest = new CreateOrderRequest("description");
        String email = "test@example.com";
        MyUser user = new MyUser(email, "password");
        Order order = new Order("id","indicationBulb", "description", ZonedDateTime.now(), user);
        OrderDto.UserDto userDto = new OrderDto.UserDto(email, "");
        OrderDto orderDto = new OrderDto("id","indicationBulb", "description", ZonedDateTime.now(), userDto);
        when(currentUser.getUsername()).thenReturn(email);
        when(userService.getUserByEmail(email)).thenReturn(user);
        when(orderMapper.toOrder(createOrderRequest)).thenReturn(order);
        when(orderService.saveOrder(order)).thenReturn(order);
        when(orderMapper.toOrderDto(order)).thenReturn(orderDto);

        // when
        OrderDto result = orderController.createOrder(currentUser, createOrderRequest);

        // then
        assertEquals(orderDto, result);
        verify(currentUser).getUsername();
        verify(userService).getUserByEmail(email);
        verify(orderMapper).toOrder(createOrderRequest);
        verify(orderService).saveOrder(order);
        verify(orderMapper).toOrderDto(order);
    }

    @Test
    void testUpdateOrder() {
        UUID orderId = UUID.randomUUID();
        String newDescription = "new description";
        String indicationBulb = "ONGOING";
        UpdateOrderRequest updateOrderRequest = new UpdateOrderRequest(newDescription);
        Order order = new Order(orderId.toString(),indicationBulb, "description", ZonedDateTime.now(), null);
        Order updatedOrder = new Order(orderId.toString(), indicationBulb, newDescription, ZonedDateTime.now(), null);
        OrderDto orderDto = new OrderDto(orderId.toString(), indicationBulb, newDescription, ZonedDateTime.now(), null);

        when(orderService.validateAndGetOrder(orderId.toString())).thenReturn(order);
        doNothing().when(orderService).updateOrderFromRequest(updateOrderRequest, order);
        when(orderService.saveOrder(any(Order.class))).thenReturn(updatedOrder);
        when(orderMapper.toOrderDto(updatedOrder)).thenReturn(orderDto);

        OrderDto result = orderController.updateOrder(orderId, updateOrderRequest);

        verify(orderService).validateAndGetOrder(orderId.toString());
        verify(orderService).updateOrderFromRequest(updateOrderRequest, order);
        verify(orderService).saveOrder(any(Order.class));
        verify(orderMapper).toOrderDto(updatedOrder);

        assertEquals(orderDto, result);
    }

    @Test
    void deleteOrder_shouldReturnDeletedOrderDto() {
        // Given
        UUID orderId = UUID.randomUUID();
        Order order = new Order("123","ONGOING", "Old description", ZonedDateTime.now(), null);
        when(orderService.validateAndGetOrder(orderId.toString())).thenReturn(order);
        doNothing().when(orderService).deleteOrder(order);
        OrderDto expectedOrderDto = new OrderDto(orderId.toString(),"FINISHED", "Old description", ZonedDateTime.now(), null);
        when(orderMapper.toOrderDto(order)).thenReturn(expectedOrderDto);

        // When
        OrderDto result = orderController.deleteOrder(orderId);

        // Then
        assertThat(result).isEqualTo(expectedOrderDto);
    }

}






