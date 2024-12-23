package com.example.foodtuck.repository.projection;

import java.util.List;

public interface FoodProjection {
    Long getId();
    String getName();
    String getCategory();
    String getQuickIntro();
    String getDescription();
    Integer getPrice();
    Integer getOriginalPrice();
    Double getRating();
    List<String> getImages();
}
