package com.example.foodtuck.service.Impl;

import com.example.foodtuck.domain.Food;
import com.example.foodtuck.dto.food.FoodSearchRequest;
import com.example.foodtuck.exception.ApiRequestException;
import com.example.foodtuck.repository.FoodRepository;
import com.example.foodtuck.repository.projection.FoodProjection;
import com.example.foodtuck.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import static com.example.foodtuck.constants.ErrorMessage.FOOD_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class FoodServiceImpl implements FoodService {

    private final FoodRepository foodRepository;

    @Override
    public Page<FoodProjection> findFoodsByFilterParams(FoodSearchRequest filter, Pageable pageable) {
        return foodRepository.findFoodsByFilterParams(
                filter.getCategories(),
                filter.getPrices().get(0),
                filter.getPrices().get(1),
                filter.getSortByPrice(),
                pageable
        );
    }

    @Override
    public Page<FoodProjection> findByInputText(String text, Pageable pageable) {
        return foodRepository.findByInputText(text, pageable);
    }

    @Override
    public Food getFoodById(Long foodId) {
        return foodRepository.findById(foodId)
                .orElseThrow(() -> new ApiRequestException(FOOD_NOT_FOUND, HttpStatus.NOT_FOUND));
    }
}
