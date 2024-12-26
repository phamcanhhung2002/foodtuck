package com.example.foodtuck.dto.order;

import com.example.foodtuck.dto.food.FoodResponse;
import lombok.Data;

@Data
public class OrderItemResponse {
    private Long id;
    private Long amount;
    private Long quantity;
    private FoodResponse food;
}
