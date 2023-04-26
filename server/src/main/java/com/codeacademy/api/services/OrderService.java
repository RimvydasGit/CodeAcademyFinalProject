package com.codeacademy.api.services;

import com.codeacademy.api.dto.UpdateOrderRequest;
import com.codeacademy.api.entities.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
    List<Order> getOrders();
    Order validateAndGetOrder(String id);
    Order saveOrder(Order order);
    void updateOrderFromRequest( UpdateOrderRequest updateOrderRequest, Order order);

    void deleteOrder(Order order);
}
