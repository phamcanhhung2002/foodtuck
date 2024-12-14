package com.example.foodtuck.controller;

import com.example.foodtuck.dto.RegistrationRequest;
import com.example.foodtuck.mapper.AuthenticationMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import static com.example.foodtuck.constants.PathConstants.ACTIVATION_CODE;
import static com.example.foodtuck.constants.PathConstants.API_V1_REGISTRATION;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_REGISTRATION)
public class RegistrationController {

    private final AuthenticationMapper authenticationMapper;

    @PostMapping
    public ResponseEntity<String> registration(@Valid @RequestBody RegistrationRequest user, BindingResult bindingResult) {
        return ResponseEntity.ok(authenticationMapper.registerUser(user, bindingResult));
    }

    @GetMapping(ACTIVATION_CODE)
    public ResponseEntity<String> activateEmailCode(@PathVariable String code) {
        return ResponseEntity.ok(authenticationMapper.activateUser(code));
    }
}
