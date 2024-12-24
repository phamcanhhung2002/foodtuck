package com.example.foodtuck.controller;

import com.example.foodtuck.dto.order.OrderRequest;
import com.example.foodtuck.dto.order.OrderResponse;
import com.example.foodtuck.mapper.OrderMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.example.foodtuck.constants.PathConstants.API_V1_ORDER;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_ORDER)
public class OrderController {

    private final OrderMapper orderMapper;

    @PostMapping
    public ResponseEntity<OrderResponse> postOrder(@Valid @RequestBody OrderRequest order, BindingResult bindingResult) {
        return ResponseEntity.ok(orderMapper.postOrder(order, bindingResult));
    }
}
