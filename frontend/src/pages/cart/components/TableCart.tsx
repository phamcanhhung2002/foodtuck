import { FC } from "react"
import { FoodResponse } from "../../../types/food"
import CellTableCart from "./CellTableCart"
import { labelColTable } from "./labelColTable"

type PropsType = {
    items : Array<FoodResponse>
    deleteFromCart: (itemId: number) => void,
    onChangeFoodItemCount: (itemId: number, itemCount: number) => void
    itemInCart: Map<number, number>
}

const TableCart: FC<PropsType> = ({items, deleteFromCart, onChangeFoodItemCount, itemInCart}) => {
    return (
    <table className='w-full border-separate border-spacing-y-8 max-lg:max-w-[calc(100vw-20vw)]'>
        <thead>
            <tr>
                {
                    labelColTable.map((label, index) => (
                        <th key={index} className={`w-[${label.size}%] text-left font-bold text-lg text-[#333] ${label.center && 'text-center'}`}>{label.title}</th>
                    ))
                }
            </tr>
        </thead>
        <tbody>
            {
                items.map((item) => (
                    <CellTableCart 
                        key={item.id}
                        item={item}
                        itemCount={itemInCart.get(item.id)!}
                        deleteFromCart={deleteFromCart}
                        onChangeFoodItemCount={onChangeFoodItemCount}
                    />
                ))
            }
        </tbody>
    </table>
  )
}

export default TableCart