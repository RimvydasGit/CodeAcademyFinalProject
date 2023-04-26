package com.codeacademy.api.mapper;

import com.codeacademy.api.dto.UserWithoutPasswordDto;
import com.codeacademy.api.entities.MyUser;
import com.codeacademy.api.entities.Order;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service
public class UserMapperImpl implements UserMapper {

    @Override
    public UserWithoutPasswordDto toUserWithoutPasswordDto( MyUser user) {
        if (user == null) {
            return null;
        }
        List<UserWithoutPasswordDto.OrderDto> orders = user.getOrders().stream().map(this::toUserDtoOrderDto).toList();
        return new UserWithoutPasswordDto(user.getId(), user.getEmail(), user.getFullName(), user.getRole(), orders);
    }

    private UserWithoutPasswordDto.OrderDto toUserDtoOrderDto( Order order) {
        if (order == null) {
            return null;
        }
        return new UserWithoutPasswordDto.OrderDto(order.getId(), order.getIndicationBulb(), order.getDescription(), order.getCreatedAt());
    }
}
