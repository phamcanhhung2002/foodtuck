package com.example.foodtuck.repository.projection;

import java.util.List;

public interface FoodProjection {
    Long getId();
    String getName();
    String getDescription();
    Integer getPrice();
    Integer getOriginalPrice();
    List<String> getImages();
}
