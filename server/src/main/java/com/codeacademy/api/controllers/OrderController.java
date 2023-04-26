package com.codeacademy.api.controllers;

import com.codeacademy.api.dto.CreateOrderRequest;
import com.codeacademy.api.dto.OrderDto;
import com.codeacademy.api.dto.UpdateOrderRequest;
import com.codeacademy.api.entities.MyUser;
import com.codeacademy.api.entities.Order;
import com.codeacademy.api.mapper.OrderMapper;
import com.codeacademy.api.security.CustomUserDetails;
import com.codeacademy.api.services.OrderService;
import com.codeacademy.api.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.codeacademy.api.utils.Roles.ADMIN;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {
    private final UserService userService;
    private final OrderService orderService;
    private final OrderMapper orderMapper;
    @GetMapping
    public List<OrderDto> getOrders() {
        List<Order> orders = orderService.getOrders();
        return orders.stream()
                .map(orderMapper::toOrderDto)
                .collect(Collectors.toList());
    }
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public OrderDto createOrder(@AuthenticationPrincipal CustomUserDetails currentUser,
                                @Valid @RequestBody CreateOrderRequest createOrderRequest) {
        if (currentUser == null) {
            throw new IllegalArgumentException("Current user cannot be null");
        }
        MyUser user = userService.getUserByEmail(currentUser.getUsername());
        Order order = orderMapper.toOrder(createOrderRequest);
        order.setId(UUID.randomUUID().toString());
        order.setUser(user);
        return orderMapper.toOrderDto(orderService.saveOrder(order));
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('" + ADMIN + "')")
    public OrderDto updateOrder(@PathVariable UUID id,
                                @Valid @RequestBody UpdateOrderRequest updateOrderRequest) {
        Order order = orderService.validateAndGetOrder(id.toString());
        orderService.updateOrderFromRequest(updateOrderRequest, order);
        return orderMapper.toOrderDto(orderService.saveOrder(order));
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('" + ADMIN + "')")
    public OrderDto deleteOrder(@PathVariable UUID id) {
        Order order = orderService.validateAndGetOrder(id.toString());
        orderService.deleteOrder(order);
        return orderMapper.toOrderDto(order);
    }

}
