package com.example.foodtuck.controller;

import com.example.foodtuck.dto.HeaderResponse;
import com.example.foodtuck.dto.order.OrderRequest;
import com.example.foodtuck.dto.order.OrderResponse;
import com.example.foodtuck.mapper.OrderMapper;
import com.example.foodtuck.security.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.foodtuck.constants.PathConstants.API_V1_ORDER;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_ORDER)
public class OrderController {

    private final OrderMapper orderMapper;

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getUserOrders(@AuthenticationPrincipal UserPrincipal user,
                                              @PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<OrderResponse> response = orderMapper.getUserOrders(user.getEmail(), pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @PostMapping
    public ResponseEntity<OrderResponse> postOrder(@Valid @RequestBody OrderRequest order, BindingResult bindingResult) {
        return ResponseEntity.ok(orderMapper.postOrder(order, bindingResult));
    }
}
