package com.example.foodtuck.dto.food;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FoodResponse {
    private Long id;
    private String name;
    private Integer price;
    private Integer originalPrice;
    private Double rating;
    private List<String> images;
    private String category;
}
