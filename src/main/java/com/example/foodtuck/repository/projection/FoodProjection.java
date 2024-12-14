package com.example.foodtuck.repository.projection;

import java.util.List;

public interface FoodProjection {
    Long getId();
    String getFoodTitle();
    String getDescription();
    Integer getPrice();
    Integer getSalePrice();
    List<String> getImageLinks();
}
