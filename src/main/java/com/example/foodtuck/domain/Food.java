package com.example.foodtuck.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Objects;

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

    @Column(name = "name")
    private String name;

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

    @Column(name = "serialized_images")
    private String serializedImages;

    @Transient
    private List<String> images;

    @PostLoad
    void deserializeImages() throws JsonProcessingException {
        images = List.of(SerializableField.objectMapper.readValue(serializedImages, String[].class));
    }

    @PrePersist
    void serializeImages() throws JsonProcessingException {
        serializedImages = SerializableField.objectMapper.writeValueAsString(images);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Food food = (Food) o;
        return Objects.equals(id, food.id);
    }

    @Override
    public int hashCode() { return Objects.hash(id); }
}
