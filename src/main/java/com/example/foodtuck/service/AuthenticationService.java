package com.example.foodtuck.service;

import com.example.foodtuck.domain.User;

import java.util.Map;

public interface AuthenticationService {
    Map<String, Object> login(String email, String password);

    String registerUser(User user, String password2);

    String activateUser(String code);
}
