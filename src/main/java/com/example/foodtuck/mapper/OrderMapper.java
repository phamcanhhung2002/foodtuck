package com.example.foodtuck.mapper;

import com.example.foodtuck.domain.Order;
import com.example.foodtuck.dto.order.OrderRequest;
import com.example.foodtuck.dto.order.OrderResponse;
import com.example.foodtuck.exception.InputFieldException;
import com.example.foodtuck.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

@Component
@RequiredArgsConstructor
public class OrderMapper {

    private final CommonMapper commonMapper;
    private final OrderService orderService;

    public OrderResponse postOrder(OrderRequest orderRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Order order = orderService.postOrder(commonMapper.convertToEntity(orderRequest, Order.class), orderRequest.getFoodsId());
        return commonMapper.convertToResponse(order, OrderResponse.class);
    }
}
