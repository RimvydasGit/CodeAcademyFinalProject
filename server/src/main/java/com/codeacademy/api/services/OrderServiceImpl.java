package com.codeacademy.api.services;

import com.codeacademy.api.dto.UpdateOrderRequest;
import com.codeacademy.api.entities.Order;
import com.codeacademy.api.exception.OrderNotFoundException;
import com.codeacademy.api.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;
    @Override
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order validateAndGetOrder( String id ) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(String.format("Order with id %s not found", id)));
    }

    @Override
    public Order saveOrder( Order order ) {
        return orderRepository.save(order);
    }

    @Override
    public void updateOrderFromRequest( UpdateOrderRequest updateOrderRequest, Order order ) {
        if (updateOrderRequest.getDescription() != null) {
            order.setDescription(updateOrderRequest.getDescription());
            order.setIndicationBulb(updateOrderRequest.getIndicationBulb());
        }
    }

    @Override
    public void deleteOrder(Order order) {
        orderRepository.delete(order);
    }

}
