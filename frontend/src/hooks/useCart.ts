import { useNavigate } from "react-router-dom";
import { CART } from "../constants/routeConstants";

interface UseCart {
  addToCart: () => void;
}

export const useCart = (foodId: number): UseCart => {
  const navigate = useNavigate();

  const addToCart = () => {
    let data: string | null = localStorage.getItem("foods");
    let cart: Map<number, any> = data ? new Map(JSON.parse(data as string)) : new Map();

    if (cart.has(foodId as number)) {
      cart.set(foodId as number, cart.get(foodId as number) + 1)
    } else {
      cart.set(foodId as number, 1)
    }
    localStorage.setItem("foods", JSON.stringify(Array.from(cart.entries())));
    navigate(CART)
  }

  return { addToCart }
}