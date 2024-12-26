package com.example.foodtuck.service.Impl;

import com.example.foodtuck.domain.Food;
import com.example.foodtuck.domain.Order;
import com.example.foodtuck.domain.OrderItem;
import com.example.foodtuck.exception.ApiRequestException;
import com.example.foodtuck.repository.FoodRepository;
import com.example.foodtuck.repository.OrderItemRepository;
import com.example.foodtuck.repository.OrderRepository;
import com.example.foodtuck.service.OrderService;
import com.example.foodtuck.service.email.MailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static com.example.foodtuck.constants.ErrorMessage.NOT_YOUR_ORDER;
import static com.example.foodtuck.constants.ErrorMessage.ORDER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final FoodRepository foodRepository;
    private final OrderItemRepository orderItemRepository;
    private final MailSender mailSender;

    @Override
    @Transactional
    public Order postOrder(Order order, Map<Long, Long> foodsId) {
        List<OrderItem> orderItemList = new ArrayList<>();

        for (Map.Entry<Long, Long> entry: foodsId.entrySet()) {
            Food food = foodRepository.findById(entry.getKey()).get();
            OrderItem orderItem = new OrderItem();
            orderItem.setFood(food);
            orderItem.setAmount(food.getPrice() * entry.getValue());
            orderItem.setQuantity(entry.getValue());
            orderItemList.add(orderItem);
            orderItemRepository.save(orderItem);
        }

        order.getOrderItems().addAll(orderItemList);
        order.setTotalPrice((double) orderItemList.stream().mapToLong(OrderItem::getAmount).sum());
        orderRepository.save(order);

        String subject = "Order #" + order.getId();
        String template = "order-template";
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("order", order);
        mailSender.sendMessageHtml(order.getEmail(), subject, template, attributes);

        return order;
    }

    @Override
    public Page<Order> getUserOrders(String email, Pageable pageable) {
        return orderRepository.findOrderByEmail(email, pageable);
    }

    @Override
    public Order getOrderById(Long orderId, String userEmail) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ApiRequestException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND));

        if (!order.getEmail().equals(userEmail)) {
            throw new ApiRequestException(NOT_YOUR_ORDER, HttpStatus.FORBIDDEN);
        }

        return order;
    }

    @Override
    public List<OrderItem> getOrderItemsByOrderId(Long orderId, String userEmail) {
        Order order = getOrderById(orderId, userEmail);
        return order.getOrderItems();
    }
}
