import { FC, useState } from 'react';
import { RightCircleOutlined } from '@ant-design/icons';
import { Checkbox, Input } from 'antd'
import { Slider } from 'antd';
import ItemLastestProduct from '../../../components/shop/ItemLastestProduct';

const listCategory : Array<string> = [
    'Sandwich', 'Hamburger', "Chicken", 'Drink', 'Pizza', 'Thi', 'Non Veg', 'Uncategorized' 
]

const listProductTags : Array<string> = [
    'Services', 'Our Menu', "Pizza", 'Cupcake', 'Burger', 'Cookies', 'Our Shop', 'Tandooori Chicken'
]

type PropsType = {
    onChangeCheckbox: (checkedValues: string[]) => void
    onChangeSlider: (values: number[]) => void,
    onSearch: (searchValue: string) => void,
    searchValue: string,
    setSearchValue: (searchValue: string) => void
}

const ShopSideBar: FC<PropsType> = ({ 
    onChangeCheckbox, onChangeSlider, onSearch, 
    searchValue, setSearchValue 
}) => {
    const [productTags, setProductTags] = useState<Array<string>>(['Services', "Pizza"])
    const [prices, setPrices] = useState<Array<number>>([1, 100]);

    const handleClickTag = (item : string) => {
        if (productTags.includes(item)) {
            setProductTags(productTags.filter((tag) => productTags.includes(tag) && tag !== item))
        } else {
            setProductTags([...productTags, item])
        }
        // Call API
    }

    return (
    <aside className='py-6 px-9 shadow-inner'>
        <Input.Search placeholder="Search Product" onSearch={onSearch} size='large' value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} className='overide-shop-search'
        />
        
        <div>
            <p className='font-bold text-[#333] text-xl my-6'>Category</p>
            <Checkbox.Group onChange={onChangeCheckbox}>
                <div className='flex flex-col gap-y-4'>
                    {
                        listCategory.map((item, index) => (
                            <Checkbox key={index} value={item} className='overide-shop-checkbox !font-sans text-[#333] text-lg'>
                                {item}
                            </Checkbox>
                        ))
                    }
                </div>
            </Checkbox.Group>
        </div>

        <div className='relative mt-6'>
            <img src='./images/shop/ads_perfect-taste.png' alt='Ads' className='w-full'/>
            <div className='absolute top-0 text-white py-7 px-6 h-full'>
                <p className='font-bold mb-1'>Perfect Taste</p>
                <p className='font-bold text-xl mb-3'>Classic Restaurant</p>
                <p className='font-bold text-primary'>45.00$</p>
                <p className='mt-auto flex items-center gap-x-2 bottom-10 absolute'>Shop now <RightCircleOutlined /></p>
            </div>
        </div>


        <div>
            <p className='font-bold text-[#333] text-xl my-6'>Filter By Price</p>
            <Slider range value={prices} className='overide-shop-slider'
                onChangeComplete={onChangeSlider}
                onChange={(values) => setPrices(values)}
            />
            <p className='flex justify-between text-[#0D0D0D]'>
                <span>From ${prices[0]} to ${prices[1]}</span>
                <span>Filter</span>
            </p>
        </div>


        <div>
            <p className='font-bold text-[#333] text-xl my-6'>Lastest Products</p>
            <div className='flex flex-col gap-4'>
                <ItemLastestProduct image='./images/shop/lastest_product.png' name='Pizza' point={3} price={35}/>
                <ItemLastestProduct image='./images/shop/lastest_product.png' name='Pizza' point={3} price={35}/>
                <ItemLastestProduct image='./images/shop/lastest_product.png' name='Pizza' point={3} price={35}/>
                <ItemLastestProduct image='./images/shop/lastest_product.png' name='Pizza' point={3} price={35}/>
            </div>
        </div>

        <div>
            <p className='font-bold text-[#333] text-xl my-6'>Product Tags</p>
            <div className='flex flex-wrap'>
                {
                    listProductTags.map((item, index) => (
                        <span className={`mr-5 text-base text-[#4f4f4f] mb-4 border-b-2 border-[#F2F2F2]
                        cursor-pointer hover:border-primary 
                        ${productTags.includes(item) && ' border-primary text-primary'}`} 
                        key={index}
                        onClick={() => handleClickTag(item)}
                        >
                            {item}
                        </span>
                    ))
                }
            </div>
        </div>
    </aside>
  )
}

export default ShopSideBar