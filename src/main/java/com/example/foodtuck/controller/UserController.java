package com.example.foodtuck.controller;

import com.example.foodtuck.dto.food.FoodResponse;
import com.example.foodtuck.dto.user.UserResponse;
import com.example.foodtuck.mapper.UserMapper;
import com.example.foodtuck.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.foodtuck.constants.PathConstants.API_V1_USERS;
import static com.example.foodtuck.constants.PathConstants.CART;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_USERS)
public class UserController {

    private final UserMapper userMapper;

    @GetMapping
    public ResponseEntity<UserResponse> getUserInfo(@AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(userMapper.getUserInfo(user.getEmail()));
    }

    @PostMapping(CART)
    public ResponseEntity<List<FoodResponse>> getCart(@RequestBody List<Long> foodIds) {
        return ResponseEntity.ok(userMapper.getCart(foodIds));
    }
}
