package com.example.foodtuck.dto.food;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FullFoodResponse extends FoodResponse {
    private String category;
    private String quickIntro;
    private String description;
}
