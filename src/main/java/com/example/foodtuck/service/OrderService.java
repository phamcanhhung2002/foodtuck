package com.example.foodtuck.service;

import com.example.foodtuck.domain.Order;
import com.example.foodtuck.domain.OrderItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface OrderService {
    Order postOrder(Order order, Map<Long, Long> foodsId);

    Page<Order> getUserOrders(String email, Pageable pageable);

    Order getOrderById(Long orderId, String userEmail);

    List<OrderItem> getOrderItemsByOrderId(Long orderId, String userEmail);

}
