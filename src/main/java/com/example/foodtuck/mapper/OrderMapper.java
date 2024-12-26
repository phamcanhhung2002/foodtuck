package com.example.foodtuck.mapper;

import com.example.foodtuck.domain.Order;
import com.example.foodtuck.dto.HeaderResponse;
import com.example.foodtuck.dto.order.OrderItemResponse;
import com.example.foodtuck.dto.order.OrderRequest;
import com.example.foodtuck.dto.order.OrderResponse;
import com.example.foodtuck.exception.InputFieldException;
import com.example.foodtuck.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.List;

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

    public HeaderResponse<OrderResponse> getUserOrders(String email, Pageable pageable) {
        Page<Order> orders = orderService.getUserOrders(email, pageable);
        return commonMapper.getHeaderResponse(orders.getContent(), orders.getTotalPages(), orders.getTotalElements(), OrderResponse.class);
    }

    public OrderResponse getOrderById(Long orderId, String userEmail) {
        return commonMapper.convertToResponse(orderService.getOrderById(orderId, userEmail), OrderResponse.class);
    }

    public List<OrderItemResponse> getOrderItemsByOrderId(Long orderId, String userEmail) {
        return commonMapper.convertToResponseList(orderService.getOrderItemsByOrderId(orderId, userEmail), OrderItemResponse.class);
    }
}
