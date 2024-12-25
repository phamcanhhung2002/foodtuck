package com.example.foodtuck.service;

import com.example.foodtuck.domain.Food;
import com.example.foodtuck.domain.User;

import java.util.List;

public interface UserService {

    User getUserInfo(String email);

    List<Food> getCart(List<Long> foodIds);

    User updateUserInfo(String email, User user);
}
