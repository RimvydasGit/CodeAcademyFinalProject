package com.codeacademy.api.mapper;

import com.codeacademy.api.dto.CreateOrderRequest;
import com.codeacademy.api.dto.OrderDto;
import com.codeacademy.api.dto.UpdateOrderRequest;
import com.codeacademy.api.entities.Order;

public interface OrderMapper {

    Order toOrder(CreateOrderRequest createOrderRequest);

    OrderDto toOrderDto(Order order);


}
