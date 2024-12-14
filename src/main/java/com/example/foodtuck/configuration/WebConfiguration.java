package com.example.foodtuck.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    @Value("${hostname}")
    private String hostname;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/v1/**")
                .allowedOrigins("http://" + hostname)
                .allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE")
                .exposedHeaders("page-total-count")
                .exposedHeaders("page-total-elements")
                .allowedHeaders("*");;
    }
}
