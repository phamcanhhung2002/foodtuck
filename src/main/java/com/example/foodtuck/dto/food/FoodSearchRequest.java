package com.example.foodtuck.dto.food;

import lombok.Data;

import java.util.List;

@Data
public class FoodSearchRequest {
    private List<String> categories;
    private List<Integer> prices;
    private Boolean sortByPrice;
}
