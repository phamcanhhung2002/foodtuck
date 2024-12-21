package com.example.foodtuck.mapper;

import com.example.foodtuck.dto.food.FoodResponse;
import com.example.foodtuck.dto.user.UserResponse;
import com.example.foodtuck.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final CommonMapper commonMapper;
    private final UserService userService;

    public UserResponse getUserInfo(String email) {
        return commonMapper.convertToResponse(userService.getUserInfo(email), UserResponse.class);
    }

    public List<FoodResponse> getCart(List<Long> foodIds) {
        return commonMapper.convertToResponseList(userService.getCart(foodIds), FoodResponse.class);
    }
}
