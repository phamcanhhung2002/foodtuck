package com.example.foodtuck.mapper;

import com.example.foodtuck.domain.User;
import com.example.foodtuck.dto.RegistrationRequest;
import com.example.foodtuck.dto.auth.AuthenticationRequest;
import com.example.foodtuck.dto.auth.AuthenticationResponse;
import com.example.foodtuck.dto.user.UserResponse;
import com.example.foodtuck.exception.InputFieldException;
import com.example.foodtuck.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class AuthenticationMapper {

    private final AuthenticationService authenticationService;
    private final CommonMapper commonMapper;

    public AuthenticationResponse login(AuthenticationRequest request) {
        Map<String, Object> credentials = authenticationService.login(request.getEmail(), request.getPassword());
        AuthenticationResponse response = new AuthenticationResponse();
        response.setUser(commonMapper.convertToResponse(credentials.get("user"), UserResponse.class));
        response.setToken((String) credentials.get("token"));
        return response;
    }

    public String registerUser(RegistrationRequest registrationRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        User user = commonMapper.convertToEntity(registrationRequest, User.class);
        return authenticationService.registerUser(user, registrationRequest.getPassword2());
    }

    public String activateUser(String code) {
        return authenticationService.activateUser(code);
    }
}
