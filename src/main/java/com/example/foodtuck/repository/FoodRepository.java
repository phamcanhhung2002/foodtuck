package com.example.foodtuck.repository;

import com.example.foodtuck.domain.Food;
import com.example.foodtuck.repository.projection.FoodProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

    @Query("SELECT food FROM Food food " +
            "WHERE (coalesce(:categories, null) IS NULL OR food.category IN :categories) " +
            "AND (coalesce(:priceStart, null) IS NULL OR food.price BETWEEN :priceStart AND :priceEnd) " +
            "ORDER BY CASE WHEN :sortByPrice = true THEN food.price ELSE -food.price END ASC")
    Page<FoodProjection> findFoodsByFilterParams(
            List<String> categories,
            Integer priceStart,
            Integer priceEnd,
            boolean sortByPrice,
            Pageable pageable);

    List<Food> findByIdIn(List<Long> foodIds);

    @Query("SELECT food FROM Food food " +
            "WHERE (UPPER(food.name) LIKE UPPER(CONCAT('%',:text,'%'))) " +
            "OR (UPPER(food.category) LIKE UPPER(CONCAT('%',:text,'%')))" +
            "ORDER BY food.price DESC")
    Page<FoodProjection> findByInputText(String text, Pageable pageable);
}
