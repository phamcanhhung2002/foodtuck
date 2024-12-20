import { FoodResponse } from "../../../types/food"
import { FC, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { CloseOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { InputNumber, Rate } from "antd"
import { labelColTable } from "./labelColTable"

type PropsType = {
  item : FoodResponse,
  itemInCart: number;
  deleteFromCart: (itemId: number) => void,
  onChangeFoodItemCount: (itemId: number, value: number) => void
} 

const CellTableCart: FC<PropsType> = ({item, itemInCart, deleteFromCart, onChangeFoodItemCount}) => {
  const [itemCount, setItemCount] = useState(1)

  useEffect(() => {
    setItemCount(itemInCart)
  }, [])

  const handleRemoveProduct = () => {
    deleteFromCart(item.id)
    toast.success(`Remove ${item.foodTitle} from cart successfully`)
  }

  return (    
    <tr className="border border-slate-600">
    <td className={`${labelColTable[0].size} flex gap-3 h-[120px] border-b border-[#E0E0E0]`}>
    <img src={item.imageLinks[0]} alt="food" className="w-[100px] h-[100px] object-cover "/>
    <div className="w-full">
      <p className="font-bold text-base">{item.foodTitle}</p>
      <Rate disabled defaultValue={item.rate} className="text-primary text-base max-lg:hidden"/>
    </div>
    </td>

    <td className={`${labelColTable[1].size} text-base text-[#333] border-b border-[#E0E0E0] text-center`}>
    {item.salePrice}$
    </td>

    <td className={`${labelColTable[2].size} text-left font-bold text-lg text-[#333] border-b border-[#E0E0E0]`}>
    <div className="flex justify-center">
      <InputNumber 
          addonBefore={
              <div className={"w-[20px] h-[20px] flex items-center justify-center :"} 
                  onClick={() => onChangeFoodItemCount(item.id, itemCount - 1)}
              >
                  <MinusOutlined className={"w-full h-full p-0 text-xs" + (itemCount === 1 ? ' !text-[#ccc]' : '')} />
              </div>
          } 
          addonAfter={
              <div className=" w-[20px] h-[20px] flex items-center justify-center" 
                  onClick={() =>  onChangeFoodItemCount(item.id, itemCount + 1)}
              >
                  <PlusOutlined className="text-xs" />
              </div>
          } 
          min={1}
          value={itemCount}
          controls={false}
          className="overide-input--qty-cart mr-4 !max-w-[110px] " 
      />
    </div>
    </td>


    <td className={`${labelColTable[3].size} font-bold text-base text-[#333] border-b border-[#E0E0E0] text-center`}>
      {item.salePrice * itemCount}$
    </td>

    <td className={`${labelColTable[4].size} font-bold text-lg text-[#333] border-b border-[#E0E0E0] max-lg:hidden`}>
    <div className="flex justify-center cursor-pointer hover:text-primary hover:text-xl"
      onClick={handleRemoveProduct}
    >
      <CloseOutlined />
    </div>
    </td>
    </tr>
  )
}

export default CellTableCart;
