package com.example.foodtuck.service.Impl;

import com.example.foodtuck.domain.Food;
import com.example.foodtuck.domain.Order;
import com.example.foodtuck.domain.OrderItem;
import com.example.foodtuck.repository.FoodRepository;
import com.example.foodtuck.repository.OrderItemRepository;
import com.example.foodtuck.repository.OrderRepository;
import com.example.foodtuck.service.OrderService;
import com.example.foodtuck.service.email.MailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
}
