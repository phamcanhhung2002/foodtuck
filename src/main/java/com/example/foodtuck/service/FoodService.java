package com.example.foodtuck.service;

import com.example.foodtuck.domain.Food;
import com.example.foodtuck.dto.food.FoodSearchRequest;
import com.example.foodtuck.repository.projection.FoodProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FoodService {

    Page<FoodProjection> findFoodsByFilterParams(FoodSearchRequest filter, Pageable pageable);

    Page<FoodProjection> findByInputText(String text, Pageable pageable);

    Food getFoodById(Long foodId);
}
