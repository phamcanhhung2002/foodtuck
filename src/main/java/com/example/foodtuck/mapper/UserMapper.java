package com.example.foodtuck.mapper;

import com.example.foodtuck.domain.User;
import com.example.foodtuck.dto.food.FoodResponse;
import com.example.foodtuck.dto.user.UpdateUserRequest;
import com.example.foodtuck.dto.user.UserResponse;
import com.example.foodtuck.exception.InputFieldException;
import com.example.foodtuck.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

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

    public UserResponse updateUserInfo(String email, @Valid UpdateUserRequest userRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        User user = commonMapper.convertToEntity(userRequest, User.class);
        return commonMapper.convertToResponse(userService.updateUserInfo(email, user), UserResponse.class);
    }
}
