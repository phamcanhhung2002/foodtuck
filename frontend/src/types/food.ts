export interface FoodResponse {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  images: Array<string>
  rate: number;
}

export interface FullFoodResponse extends FoodResponse {
  quickIntroduction: string;
  description: string;
}