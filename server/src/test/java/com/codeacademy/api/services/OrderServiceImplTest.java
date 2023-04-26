package com.codeacademy.api.services;

import com.codeacademy.api.dto.UpdateOrderRequest;
import com.codeacademy.api.entities.Order;
import com.codeacademy.api.exception.OrderNotFoundException;
import com.codeacademy.api.repositories.OrderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

public class OrderServiceImplTest {

    @Mock
    private OrderRepository orderRepository;

    private OrderService orderService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        orderService = new OrderServiceImpl(orderRepository);
    }

    @Test
    @DisplayName("Test get all orders")
    public void testGetOrders() {
        List<Order> orders = new ArrayList<>();
        orders.add(new Order("1", "order1"));
        orders.add(new Order("2", "order2"));
        Mockito.when(orderRepository.findAll()).thenReturn(orders);
        List<Order> returnedOrders = orderService.getOrders();
        assertEquals(2, returnedOrders.size());
    }

    @Test
    @DisplayName("Test validate and get order")
    public void testValidateAndGetOrder() {
        Order order = new Order("1", "order1");
        Mockito.when(orderRepository.findById("1")).thenReturn(Optional.of(order));
        Order returnedOrder = orderService.validateAndGetOrder("1");
        assertEquals(order, returnedOrder);
    }

    @Test
    @DisplayName("Test validate and get order with non-existing id")
    public void testValidateAndGetOrderWithNonExistingId() {
        Mockito.when(orderRepository.findById("1")).thenReturn(Optional.empty());
        assertThrows(OrderNotFoundException.class, () -> orderService.validateAndGetOrder("1"));
    }

    @Test
    @DisplayName("Test save order")
    public void testSaveOrder() {
        Order order = new Order("1", "order1");
        Mockito.when(orderRepository.save(order)).thenReturn(order);
        Order returnedOrder = orderService.saveOrder(order);
        assertEquals(order, returnedOrder);
    }

    @Test
    @DisplayName("Test update order description")
    public void testUpdateOrderDescription() {
        Order order = new Order("1", "order1");
        UpdateOrderRequest request = new UpdateOrderRequest("new description");
        orderService.updateOrderFromRequest(request, order);
    }

    @Test
    @DisplayName("Test delete order")
    public void testDeleteOrder() {
        Order order = new Order("1", "order1");
        orderService.deleteOrder(order);
        Mockito.verify(orderRepository, Mockito.times(1)).delete(order);
    }
}