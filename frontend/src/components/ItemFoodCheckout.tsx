import { FC } from "react"
import { FoodResponse } from "../types/food"

type PropsType = {
    item: FoodResponse,
    quantity: number
}

const ItemFoodCheckout: FC<PropsType> = ({ item, quantity }) => {
    return (
    <div className="flex pb-4 border-b-[1px] border-[#E0E0E0] mb-6">
        <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover mr-4"/>

        <div>
            <p className="text-[#333] font-bold text-base mb-2">{item.name}</p>
            <p className="text-[#4f4f4f] mb-1">x{quantity}</p>
            <p className="text-[#4f4f4f]">{Number(item.price).toFixed(2)}$</p>  
        </div> 
    </div>
  )
}

export default ItemFoodCheckout