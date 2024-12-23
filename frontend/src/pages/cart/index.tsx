import TableCart from './components/TableCart'
import CoverPage from '../../components/CoverPage'
import { Button, Divider, Input } from 'antd'
import { SelectOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { selectCartItems, selectIsCartLoading, selectTotalPrice } from '../../state/cart/cart-selector'
import { useEffect, useState } from 'react'
import { fetchCart } from '../../state/cart/cart-thunk'
import { calculateCartPrice, removeFoodById, resetCartState, setCartItemsCount } from '../../state/cart/cart-slice'
import Spinner from "../../components/Spinner"
import { useDispatch, useSelector } from 'react-redux'

const ShoppingCart = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const foods = useSelector(selectCartItems);
  const isCartLoading = useSelector(selectIsCartLoading)
  const totalPrice = useSelector(selectTotalPrice)
  const [foodInCart, setFoodInCart] = useState(() => new Map());

  useEffect(() => {
    const foodsFromLocalStorage: Map<number, number> = new Map(
      JSON.parse(localStorage.getItem("foods") as string)
    )

    dispatch(fetchCart(Array.from(foodsFromLocalStorage.keys())))

    foodsFromLocalStorage.forEach((value: number, key: number) => {
      setFoodInCart(foodInCart.set(key, value))
    })

    return () => {
      dispatch(resetCartState())
    }
  }, [])

  const deleteFromCart = (foodId: number) => {
    foodInCart.delete(foodId)

    if (foodInCart.size === 0) {
      localStorage.removeItem("foods")
      setFoodInCart(new Map());
    } else {
      localStorage.setItem("foods", JSON.stringify(Array.from(foodInCart.entries())))
    }
    dispatch(removeFoodById(foodId))
    dispatch(setCartItemsCount(foodInCart.size))
  }

  const setFoods = (foodId: number, foodCount: number) => {
    setFoodInCart(new Map(foodInCart.set(foodId, foodCount)));
    localStorage.setItem("foods", JSON.stringify(Array.from(foodInCart.entries())))
  }

  const onChangeFoodItemCount = (foodId: number, inputValue: number) => {
    setFoods(foodId, inputValue);
    dispatch(calculateCartPrice(foods))
  }

  return (
    <div>
        <CoverPage title='Shopping Cart' currentPage='Shopping Cart' listPath={[{path:'/', title: 'Home'}]}/>
        {
          isCartLoading ? (<Spinner/>) : <>
            <TableCart 
              items={foods}
              deleteFromCart={deleteFromCart}
              onChangeFoodItemCount={onChangeFoodItemCount}
              itemInCart={foodInCart}
            />
            <div className='flex gap-x-10 mt-24 max-lg:flex-col'>
              <div className='basis-1/2'>
                <p className='font-bold text-[#333] text-3xl mb-6'>Coupon Code</p>
                <div className='p-6 border border-[#e0e0e0] rounded-md'>
                  <p className='mb-6 text-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non</p>
                  <Input
                    addonAfter={<p className='h-14 flex items-center justify-center w-[90px] text-lg'>Apply</p>}
                    placeholder="Enter Code Here"
                    className="overide-input--cart w-full rounded-none h-14"
                  />
                </div>
              </div>

              <div className='basis-1/2'>
                <p className='font-bold text-[#333] text-3xl mb-6'>Total Bill</p>
                <div className='border border-[#E0E0E0] p-6 rounded-md'>
                  <p className='flex justify-between mb-4 font-bold text-xl text-[#333]'>Cart Subtotal <span>${totalPrice}</span></p>
                  <p className='flex justify-between text-[#4F4F4F] text-lg'>Shipping Charge <span>$0</span></p>
                  <Divider />
                  <p className='flex justify-between font-bold text-xl text-[#333]'>Total Amount <span>${totalPrice}</span></p>
                </div>
                <Button className='flex mt-6 items-center justify-center rounded-none h-14 text-base w-full
                text-white bg-primary hover:!bg-[#248001]' type='primary'
                  onClick={() => navigate('./checkout')}
                > 
                  Proceed to Checkout 
                  <SelectOutlined /> 
                </Button>
              </div>
            </div>
          </>
        }
    </div>
  )
}

export default ShoppingCart