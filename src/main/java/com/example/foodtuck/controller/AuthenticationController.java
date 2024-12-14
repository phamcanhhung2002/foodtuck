package com.example.foodtuck.controller;

import com.example.foodtuck.dto.auth.AuthenticationRequest;
import com.example.foodtuck.dto.auth.AuthenticationResponse;
import com.example.foodtuck.mapper.AuthenticationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.example.foodtuck.constants.PathConstants.API_V1_AUTH;
import static com.example.foodtuck.constants.PathConstants.LOGIN;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_AUTH)
public class AuthenticationController {

    private final AuthenticationMapper authenticationMapper;

    @PostMapping(LOGIN)
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationMapper.login(request));
    }
}
