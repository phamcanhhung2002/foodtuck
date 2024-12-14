package com.example.foodtuck.dto.auth;

import com.example.foodtuck.dto.user.UserResponse;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private UserResponse user;
    private String token;
}
