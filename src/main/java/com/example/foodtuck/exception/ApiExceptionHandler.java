package com.example.foodtuck.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(ApiRequestException.class)
    public ResponseEntity<String> handleApiRequestException(ApiRequestException exception) {
        return ResponseEntity.status(exception.getStatus()).body(exception.getMessage());
    }

    @ExceptionHandler(PasswordException.class)
    public ResponseEntity<PasswordException> handlePasswordException(PasswordException exception) {
        return ResponseEntity.badRequest().body(new PasswordException(exception.getPasswordError()));
    }

    @ExceptionHandler(EmailException.class)
    public ResponseEntity<EmailException> handleEmailException(EmailException exception) {
        return ResponseEntity.badRequest().body(new EmailException(exception.getEmailError()));
    }

    @ExceptionHandler(InputFieldException.class)
    public ResponseEntity<Map<String, String>> handleInputFieldException(InputFieldException exception) {
        InputFieldException inputFieldException = new InputFieldException(exception.getBindingResult());
        return ResponseEntity.badRequest().body(inputFieldException.getErrorsMap());
    }

    @ExceptionHandler(JwtAuthenticationException.class)
    public ResponseEntity<String> handleJwtAuthenticationException(JwtAuthenticationException exception) {
        return ResponseEntity.status(exception.getHttpStatus().value()).body(exception.getMessage());
    }
}
