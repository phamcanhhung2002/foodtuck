import { useNavigate } from "react-router-dom";
import { CART } from "../constants/routeConstants";

interface UseCart {
  addToCart: (quantity?: number) => void;
}

export const useCart = (foodId: number): UseCart => {
  const navigate = useNavigate();

  const addToCart = (quantity: number = 1) => {
    let data: string | null = localStorage.getItem("foods");
    let cart: Map<number, any> = data ? new Map(JSON.parse(data as string)) : new Map();

    if (cart.has(foodId as number)) {
      cart.set(foodId as number, cart.get(foodId as number) + quantity)
    } else {
      cart.set(foodId as number, quantity)
    }
    
    localStorage.setItem("foods", JSON.stringify(Array.from(cart.entries())));

    navigate(CART)
  }

  return { addToCart }
}