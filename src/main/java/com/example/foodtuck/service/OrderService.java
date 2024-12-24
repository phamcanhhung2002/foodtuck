package com.example.foodtuck.service;

import com.example.foodtuck.domain.Order;

import java.util.Map;

public interface OrderService {
    Order postOrder(Order order, Map<Long, Long> foodsId);
}
