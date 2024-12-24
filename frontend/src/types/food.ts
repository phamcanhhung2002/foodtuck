export interface FoodResponse {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  images: Array<string>
  rating: number;
}

export interface FullFoodResponse extends FoodResponse {
  category: string;
  quickIntro: string;
  description: string;
}

export interface FilterParamsType {
	categories?: Array<string>;
	prices: Array<number>;
	currentPage?: number;
  pageSize?: number;
	sortByPrice?: boolean;	
}

export interface FoodsSearchRequest {
  text: string;
  currentPage: number;
  pageSize: number;
}