import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Button, Divider, InputNumber, Rate, Segmented } from "antd"
import { ArrowLeftOutlined, ArrowRightOutlined, FacebookFilled, 
        HeartOutlined, InstagramFilled, InteractionOutlined, 
        ShoppingCartOutlined, TwitterOutlined, YoutubeFilled } from "@ant-design/icons"
import ItemFood from "../../components/ItemFood"
import CoverPage from "../../components/CoverPage"
import { toast } from "react-toastify"
import { useCart } from "../../hooks/useCart"
import { useDispatch, useSelector } from "react-redux"
import { selectFood, selectFoodError, selectFoodErrorMessage, selectIsFoodLoaded, selectIsFoodLoading } from "../../state/food/food-selector"
import { fetchFood } from "../../state/food/food-thunk"
import { resetFoodState } from "../../state/food/food-slice"
import Spinner from "../../components/Spinner"
import { FoodResponse } from "../../types/food"
import { BASE, SHOP } from "../../constants/routeConstants"

const DetailProduct = () => {
    const dispatch = useDispatch<any>();
    const { id } = useParams<{ id: string }>()
    const food = useSelector(selectFood)
    const isFoodLoading = useSelector(selectIsFoodLoading)
    const isFoodLoaded = useSelector(selectIsFoodLoaded)
    const isFoodError = useSelector(selectFoodError)
    const errorMessage = useSelector(selectFoodErrorMessage)
    const [quantity, setQuantity] = useState<number>(1)
    const [currentImage, setCurrentImage] = useState(0)
    const { addToCart } = useCart(parseInt(id!));

    useEffect(() => {
        dispatch(fetchFood(id!))

        return () => {
            dispatch(resetFoodState())
        }
    }, [])

    const handleAddMultipleProduct = () => {
        addToCart(quantity)
        toast.success(`Add ${Number(quantity) < 10 ? '0' + String(quantity) : String(quantity)} ${food.name} successfull!`)
    }

    return (
        <article>
            <CoverPage title="Shop Detail" currentPage={food?.name!} 
                listPath={[{ title: 'Home',path: BASE },  { title: 'Shop', path: SHOP }]}
            />
            {isFoodLoading ? (
                <Spinner/>
            ) : (
                <>
                    {isFoodError ? (
                        <p className="text-center">{errorMessage}</p>
                    ) : (
                        <>
                            <section className="flex flex-row justify-between max-lg:flex-col max-lg:gap-y-10">
                                <div className="grid grid-cols-4 grid-rows-4 gap-6 basis-[45%] grid-flow-col max-lg:gap-3">
                                    {
                                        food.images!.map((item, index: number) => {
                                            return (
                                                index !== currentImage &&
                                                     <img key={index} src={item} alt="" className="bg-cover h-full w-full" onClick={() => setCurrentImage(index)}/>
                                            )
                                        })
                                    }
                                    <img src={food.images![currentImage]} alt="" className="row-span-4 col-span-3 bg-cover h-96 w-full" />
                                </div>

                                <div className="basis-[50%] grow-0">
                                    <div className="flex items-center justify-between">
                                        {
                                            1 > 0 ? 
                                            <div className="bg-primary text-white px-6 mb-2 rounded-md py-2 inline-block">In stock</div> : 
                                            <div className="bg-disabledGreen text-white px-6 mb-2 rounded-md py-2 inline-block">Out of stock</div>
                                        }
                                        <div className="flex gap-5">
                                            <p className="text-[#828282]"><ArrowLeftOutlined /> Prev</p>
                                            <p className="text-[#828282]">Next <ArrowRightOutlined /></p>                        
                                        </div>    
                                    </div>

                                    <p className="font-bold text-5xl text-[#333] pb-6 max-lg:text-3xl">{food.name}</p>

                                    <p className="text-lg text-[#4f4f4f]">{food.quickIntro}</p>

                                    <Divider />
                                
                                    <p className="font-bold text-[32px] text-[#333]">{food.price}.00$</p>

                                    <div className="flex items-center gap-3">
                                        <Rate defaultValue={food.rating} className="text-primary"/>
                                        <Divider type="vertical"  className="h-5"/>
                                        <p>{food.rating} Rating</p>
                                        <Divider type="vertical" className="h-5"/>
                                        {/* <p>{food.qtyReview} Reviews </p> */}
                                    </div>

                                    <p className="mt-5 text-[#333] text-lg">Dictum/cursus/Risus</p>

                                    <div className="mt-6">
                                        <InputNumber 
                                            addonBefore={
                                                <div className=" w-[50px] h-[50px] flex items-center justify-center" 
                                                    onClick={() => Number(quantity) > 1 && setQuantity((prv) => Number(prv) - 1)}>
                                                -
                                                </div>
                                            } 
                                            addonAfter={
                                                <div className=" w-[50px] h-[50px] flex items-center justify-center" 
                                                    onClick={() => setQuantity((prv) => Number(prv) + 1)}>
                                                +
                                                </div>
                                            } 
                                            min={1}
                                            onChange={(value) => value && setQuantity(value)}
                                            value={quantity}
                                            controls={false}
                                            className="overide-input--qty-detail mr-4" 
                                        />
                                        <Button icon={<ShoppingCartOutlined/>} type="primary" className="bg-primary rounded-none h-[50px]"
                                            onClick={handleAddMultipleProduct}
                                        >Add to cart</Button>
                                    </div>

                                    <Divider />

                                    <div className="flex gap-5 mb-2 text-[#4f4f4f] text-lg">
                                        <p className="flex items-center gap-x-2"><HeartOutlined /> Add to wishlist</p>
                                        <p className="flex items-center gap-x-2"><InteractionOutlined /> Compare</p>
                                    </div>
                                    <p className="mb-2 text-lg">Catagory: <span className="text-[#4f4f4f]">{food.category}</span></p>
                                    <p className="mb-6 text-lg">Tag: <span className="text-[#4f4f4f]">Our Shop</span></p>
                                    <p className="text-lg text-[#333] flex items-center">Share: 
                                        <span className="text-white gap-3 flex ml-3">
                                            <YoutubeFilled className="bg-black p-[6px] rounded-full"/> 
                                            <FacebookFilled className="bg-black p-[6px] rounded-full"/> 
                                            <TwitterOutlined className="bg-black p-[6px] rounded-full"/> 
                                            <InstagramFilled className="bg-black p-[6px] rounded-full"/> 
                                        </span>
                                    </p>
                                    <Divider />
                                </div>
                            </section>

                            {/* <section className="pt-14">
                                <Segmented options={['Description', `Review (${food.qtyReview})`]} 
                                    className="overide-segmented--detail bg-white mb-8 h-[50px]"/>
                                {
                                    food.desc.map(( item, index : number ) => { return (
                                        <p className="mb-3" key={index}>{item}</p>
                                    )})
                                }
                            </section>
                             */}
                            <section className="mt-24">
                                <p className="font-bold text-3xl mb-8">Similar Product</p>

                                <div className="flex justify-between mb-32 gap-x-10 max-lg:grid max-lg:grid-cols-1  ">
                                    <ItemFood food={food as FoodResponse} />
                                    <ItemFood food={food as FoodResponse} />
                                    <ItemFood food={food as FoodResponse} />
                                    <ItemFood food={food as FoodResponse}/>
                                    <ItemFood food={food as FoodResponse}/>
                                </div>
                            </section>
                        </>
                    )
                    }
                </>
            )
            }
        </article>
    )
}

export default DetailProduct