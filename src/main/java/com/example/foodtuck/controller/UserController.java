package com.example.foodtuck.controller;

import com.example.foodtuck.dto.food.FoodResponse;
import com.example.foodtuck.dto.user.UpdateUserRequest;
import com.example.foodtuck.dto.user.UserResponse;
import com.example.foodtuck.mapper.UserMapper;
import com.example.foodtuck.security.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
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


    @PutMapping
    public ResponseEntity<UserResponse> updateUserInfo(@AuthenticationPrincipal UserPrincipal user,
                                                       @Valid @RequestBody UpdateUserRequest request,
                                                       BindingResult bindingResult) {
        return ResponseEntity.ok(userMapper.updateUserInfo(user.getEmail(), request, bindingResult));
    }

    @PostMapping(CART)
    public ResponseEntity<List<FoodResponse>> getCart(@RequestBody List<Long> foodIds) {
        return ResponseEntity.ok(userMapper.getCart(foodIds));
    }
}
