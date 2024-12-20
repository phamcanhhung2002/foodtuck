export interface FoodResponse {
  id: number;
  foodTitle: string;
  price: number;
  salePrice: number;
  imageLinks: Array<string>
  rate: number;
}

export interface FullFoodResponse extends FoodResponse {
  quickIntroduction: string;
  description: string;
}