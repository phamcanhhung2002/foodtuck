package com.example.foodtuck.dto.food;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FoodResponse {
    private Long id;
    private String foodTitle;
    private Integer price;
    private Integer salePrice;
    private List<String> imageLinks;
}
