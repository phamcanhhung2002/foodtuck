package com.example.foodtuck.constants;

public class PathConstants {

    public static final String API_V1 = "/api/v1";
    public static final String FOODS = "/foods";

    public static final String API_V1_FOODS = API_V1 + FOODS;
    public static final String API_V1_AUTH = API_V1 + "/auth";
    public static final String API_V1_REGISTRATION = API_V1 + "/registration";
    public static final String API_V1_USERS = API_V1 + "/users";
    public static final String API_V1_ORDER = API_V1 + "/order";

    public static final String CART = "/cart";

    public static final String LOGIN = "/login";
    public static final String CODE = "/{code}";
    public static final String ACTIVATION_CODE = "/activate" + CODE;

    public static final String ORDER_ID = "/{orderId}";
    public static final String ORDER_ID_ITEMS = "/{orderId}/items";

    public static final String FOOD_ID = "/{foodId}";
    public static final String SEARCH = "/search";
    public static final String SEARCH_TEXT = "/search/text";
}
