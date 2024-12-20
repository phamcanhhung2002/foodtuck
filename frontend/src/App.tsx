import { BrowserRouter } from "react-router-dom"
import './index.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RouterList from "./router"
import { useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { fetchCart } from "./state/cart/cart-thunk";
import { fetchUserInfo } from "./state/user/user-thunk";

export default function App() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    const foodsFromLocalStorage: Map<number, number> = new Map(
      JSON.parse(localStorage.getItem("foods") as string)
    )
    dispatch(fetchCart(Array.from(foodsFromLocalStorage.keys())));

    if (localStorage.getItem("token")) {
      dispatch(fetchUserInfo());
    }
  }, [])

  return (
    <BrowserRouter>
      <RouterList />
    </BrowserRouter>
  )
}