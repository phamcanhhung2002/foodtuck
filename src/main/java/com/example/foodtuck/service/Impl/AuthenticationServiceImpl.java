package com.example.foodtuck.service.Impl;

import com.example.foodtuck.domain.User;
import com.example.foodtuck.enums.Role;
import com.example.foodtuck.exception.ApiRequestException;
import com.example.foodtuck.exception.EmailException;
import com.example.foodtuck.exception.PasswordException;
import com.example.foodtuck.repository.UserRepository;
import com.example.foodtuck.security.JwtService;
import com.example.foodtuck.service.AuthenticationService;
import com.example.foodtuck.service.email.MailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static com.example.foodtuck.constants.ErrorMessage.*;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final MailSender mailSender;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Value("${hostname}")
    private String hostname;

    @Override
    public Map<String, Object> login(String email, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new ApiRequestException(EMAIL_NOT_FOUND, HttpStatus.NOT_FOUND));
            String userRole = user.getRoles().iterator().next().name();
            String token = jwtService.createToken(email, userRole);
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("token", token);
            return response;
        } catch (AuthenticationException e) {
            throw new ApiRequestException(INCORRECT_PASSWORD, HttpStatus.FORBIDDEN);
        }
    }

    @Override
    @Transactional
    public String registerUser(User user, String password2) {

        if (user.getPassword() != null && !user.getPassword().equals(password2)) {
            throw new PasswordException(PASSWORDS_DO_NOT_MATCH);
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new EmailException(EMAIL_IN_USE);
        }
        user.setActive(false);
        user.setRoles(Collections.singleton(Role.USER));
        user.setActivationCode(UUID.randomUUID().toString());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        sendEmail(user, "Activation code", "registration-template", "registrationUrl", "/activate/" + user.getActivationCode());
        return "User successfully registered.";
    }

    @Override
    @Transactional
    public String activateUser(String code) {
        User user = userRepository.findByActivationCode(code)
                .orElseThrow(() -> new ApiRequestException(ACTIVATION_CODE_NOT_FOUND, HttpStatus.NOT_FOUND));
        user.setActivationCode(null);
        user.setActive(true);
        userRepository.save(user);
        return "User successfully activated.";
    }

    private void sendEmail(User user, String subject, String template, String urlAttribute, String urlPath) {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("firstName", user.getFirstName());
        attributes.put(urlAttribute, "http://" + hostname + urlPath);
        mailSender.sendMessageHtml(user.getEmail(), subject, template, attributes);
    }
}
