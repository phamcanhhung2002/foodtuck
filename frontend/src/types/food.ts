export interface FoodResponse {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  images: Array<string>
  rating: number;
}

export interface FullFoodResponse extends FoodResponse {
  quickIntroduction: string;
  description: string;
}