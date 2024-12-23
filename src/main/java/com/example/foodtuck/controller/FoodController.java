package com.example.foodtuck.controller;

import com.example.foodtuck.dto.HeaderResponse;
import com.example.foodtuck.dto.food.FoodResponse;
import com.example.foodtuck.dto.food.FoodSearchRequest;
import com.example.foodtuck.dto.food.FullFoodResponse;
import com.example.foodtuck.dto.food.SearchTextRequest;
import com.example.foodtuck.mapper.FoodMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.foodtuck.constants.PathConstants.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_FOODS)
public class FoodController {

    private final FoodMapper foodMapper;

    @GetMapping(FOOD_ID)
    public ResponseEntity<FullFoodResponse> getFoodById(@PathVariable Long foodId) {
        return ResponseEntity.ok(foodMapper.getFoodById(foodId));
    }

    @PostMapping(SEARCH)
    public ResponseEntity<List<FoodResponse>> findFoodsByFilterParams(@RequestBody FoodSearchRequest filter,
                                                                      @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<FoodResponse> response = foodMapper.findFoodsByFilterParams(filter, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @PostMapping(SEARCH_TEXT)
    public ResponseEntity<List<FoodResponse>> findByInputText(@RequestBody SearchTextRequest search,
                                                                @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<FoodResponse> response = foodMapper.findByInputText(search.getText(), pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }
}
