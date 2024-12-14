package com.example.foodtuck.mapper;

import com.example.foodtuck.dto.HeaderResponse;
import com.example.foodtuck.dto.food.FoodResponse;
import com.example.foodtuck.dto.food.FoodSearchRequest;
import com.example.foodtuck.repository.projection.FoodProjection;
import com.example.foodtuck.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FoodMapper {

    private final CommonMapper commonMapper;
    private final FoodService foodService;

    public HeaderResponse<FoodResponse> findFoodsByFilterParams(FoodSearchRequest filter, Pageable pageable) {
        Page<FoodProjection> foods = foodService.findFoodsByFilterParams(filter, pageable);
        return commonMapper.getHeaderResponse(foods.getContent(), foods.getTotalPages(), foods.getTotalElements(), FoodResponse.class);
    }
}
