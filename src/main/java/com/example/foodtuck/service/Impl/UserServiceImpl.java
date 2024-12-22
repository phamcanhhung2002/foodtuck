package com.example.foodtuck.service.Impl;

import com.example.foodtuck.domain.Food;
import com.example.foodtuck.domain.User;
import com.example.foodtuck.exception.ApiRequestException;
import com.example.foodtuck.repository.FoodRepository;
import com.example.foodtuck.repository.UserRepository;
import com.example.foodtuck.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.foodtuck.constants.ErrorMessage.EMAIL_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final FoodRepository foodRepository;

    @Override
    public User getUserInfo(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiRequestException(EMAIL_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    public List<Food> getCart(List<Long> foodIds) {
        return foodRepository.findByIdIn(foodIds);
    }
}
