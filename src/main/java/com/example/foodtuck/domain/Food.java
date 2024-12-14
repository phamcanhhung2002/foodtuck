package com.example.foodtuck.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "food")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "food_id_seq")
    @SequenceGenerator(name = "food_id_seq", sequenceName = "food_id_seq", initialValue = 109, allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @Column(name = "food_title")
    private String foodTitle;

    @Column(name = "category")
    private String category;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Integer price;

    @Column(name = "sale_price")
    private Integer salePrice;
}
