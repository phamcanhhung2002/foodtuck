package com.example.foodtuck.mapper;

import com.example.foodtuck.dto.HeaderResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CommonMapper {

    private final ModelMapper modelMapper;

    <T, S> S convertToEntity(T data, Class<S> type) {
        return modelMapper.map(data, type);
    }

    <T, S> HeaderResponse<S> getHeaderResponse(List<T> orders, Integer totalPages, Long totalElements, Class<S> type) {
        List<S> orderResponses = convertToResponseList(orders, type);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("page-total-count", String.valueOf(totalPages));
        responseHeaders.add("page-total-elements", String.valueOf(totalElements));
        return new HeaderResponse<S>(orderResponses, responseHeaders);
    }

    <T, S> List<S> convertToResponseList(List<T> orders, Class<S> type) {
        return orders.stream().map( order -> convertToResponse(order, type)).collect(Collectors.toList());
    }

    <T, S> S convertToResponse(T data, Class<S> type) {
        return modelMapper.map(data, type);
    }
}
