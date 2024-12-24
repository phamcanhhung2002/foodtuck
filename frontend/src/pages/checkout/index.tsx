import { Button, Divider, Form } from 'antd'
import CoverPage from '../../components/CoverPage'
import ItemFoodCheckout from '../../components/ItemFoodCheckout'
import { ArrowRightOutlined, LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserFromUserState } from '../../state/user/user-selector'
import { selectCartItems, selectTotalPrice } from '../../state/cart/cart-selector'
import { selectIsOrderLoading, selectOrderErrors } from '../../state/order/order-selector'
import { useEffect, useState } from 'react'
import { setOrderLoadingState } from '../../state/order/order-slice'
import { LoadingStatus } from '../../types/types'
import { fetchCart } from '../../state/cart/cart-thunk'
import { resetCartState } from '../../state/cart/cart-slice'
import { addOrder } from '../../state/order/order-thunk'
import { FoodResponse } from '../../types/food'
import { CART } from '../../constants/routeConstants'
import FormInput from './FormInput'

interface OrderFormData {
    firstName: string;
    lastName: string;
    city: string;
    address: string;
    phoneNumber: string;
    postIndex: string;
    email: string;
}

const Checkout = () => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const usersData = useSelector(selectUserFromUserState)
    const foods = useSelector(selectCartItems)
    const totalPrice = useSelector(selectTotalPrice)
    const errors = useSelector(selectOrderErrors);
    const isOrderLoading = useSelector(selectIsOrderLoading)
    const [foodsFromLocalStorage, setFoodsFromLocalStorage] = useState<Map<number, number>>(new Map());

    useEffect(() => {
        const foodsFromLocalStorage: Map<number, number> = new Map(
            JSON.parse(localStorage.getItem("foods") as string)
        )
        setFoodsFromLocalStorage(foodsFromLocalStorage)
        dispatch(setOrderLoadingState(LoadingStatus.LOADED))
        dispatch(fetchCart(Array.from(foodsFromLocalStorage.keys())))

        if (usersData) {
            form.setFieldsValue(usersData)
        }

        return () => {
            dispatch(resetCartState())
        }
    }, [])
    
    const onFormSubmit = (order: OrderFormData): void => {
        const foodsId = Object.fromEntries(new Map(JSON.parse(localStorage.getItem("foods") as string)))
        dispatch(addOrder({ order: { ... order, foodsId }, navigate}))
    }

    return (
    <div >
        <CoverPage title='Checkout Page' currentPage='Checkout' listPath={[{title: "Home", path: '/'}]}/>

        <Form onFinish={onFormSubmit} form={form}>
            <div className='flex gap-x-10 max-lg:flex-col'>
                <article className='basis-8/12 text-[#333]'>
                    <p className='font-bold text-xl mb-6'>Shipping Address</p>
                    <div className='grid grid-cols-2 gap-5 mb-8 max-lg:grid-cols-1 max-lg:mb-10'>
                        <FormInput title={"First Name"} name={"firstName"} disabled={isOrderLoading} error={errors.firstNameError}/>
                        <FormInput title={"Last Name"} name={"lastName"} disabled={isOrderLoading} error={errors.lastNameError}/>
                        <FormInput title={"Email Address"} name={"email"} disabled={isOrderLoading} error={errors.emailError}/>
                        <FormInput title={"Phone Number"} name={"phoneNumber"} disabled={isOrderLoading} error={errors.phoneNumberError}/>
                        <FormInput title={"City"} name={"city"} disabled={isOrderLoading} error={errors.cityError}/>
                        <FormInput title={"Address"} name={"address"} disabled={isOrderLoading} error={errors.addressError}/>
                        <FormInput title={"Post Index"} name={"postIndex"} disabled={isOrderLoading} error={errors.postIndexError}/>
                    </div>
                    <div className='mt-6 grid grid-cols-2 gap-5'>
                        <Button className='flex items-center justify-center rounded-none h-14 text-base text-[#4F4F4F]
                            hover:!text-primary hover:!border-primary'
                            onClick={() => navigate(CART)}
                        >
                            <LeftOutlined />
                            Back to cart
                        </Button>
                        {/* <Button type="primary" className='flex items-center justify-center rounded-none h-14 text-base text-white
                            bg-primary
                        '>
                            Proceed to shipping
                            <RightOutlined />
                        </Button> */}
                    </div>
                </article>
                <aside className='basis-4/12 p-6 border border-1 border-[#e0e0e0] h-full'>
                    <div>
                        {
                            foods.map((item : FoodResponse) => (
                                <ItemFoodCheckout key={item.id} item={item} 
                                    quantity={foodsFromLocalStorage.get(item.id)!}/>
                            ))
                        }
                    </div>
            
                    <div className='flex flex-col gap-2 text-[#4F4F4F] mb-6'>
                        <p className='text-base flex justify-between'>
                            Sub-total
                            <span className='text-[#333]'>{totalPrice}$</span>
                        </p>
                        <p className='text-base flex justify-between'>
                            Shipping
                            <span className='text-[#333]'>Free</span>
                        </p>
                        <p className='text-base flex justify-between'>
                            Discount
                            <span className='text-[#333]'>0%</span>
                        </p>
                        <p className='text-base flex justify-between'>
                            Tax
                            <span className='text-[#333]'>0%</span>
                        </p>
                        <Divider className='m-0'/>
                        <p className='text-base flex justify-between font-lg text-[#333]'>Total <span className='font-bold'>{totalPrice}$</span></p>
                    </div>
                    <Button htmlType={"submit"} loading={isOrderLoading}
                        className='flex items-center bg-primary text-white w-full h-[58px] justify-center text-lg font-bold'
                    >
                        Place an order <ArrowRightOutlined />
                    </Button>
                </aside>
            </div>
        </Form>
    </div>
  )
}

export default Checkout