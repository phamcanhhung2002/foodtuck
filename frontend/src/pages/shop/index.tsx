import { Select } from "antd"
import ShopSideBar from "./components/ShopSideBar"
import ShopPagination from "./components/ShopPagination"
import CoverPage from "../../components/CoverPage"
import ItemFood from "../../components/ItemFood"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectFoods, selectIsFoodsLoading } from "../../state/foods/foods-selector"
import { FilterParamsType } from "../../types/food"
import { fetchFoodsByFilterParams, fetchFoodsByInputText } from "../../state/foods/foods-thunk"
import { resetFoodsState } from "../../state/foods/foods-slice"
import Spinner from "../../components/Spinner"
import { MAX_PAGE_VALUE, usePagination } from "../../hooks/usePagination"
import { useSearch } from "../../hooks/useSearch"

const Shop = () => {
	const dispatch = useDispatch<any>();
	const foods = useSelector(selectFoods)
	const isFoodsLoading = useSelector(selectIsFoodsLoading);
	const [filterParams, setFilterParams] = useState<FilterParamsType>({
		prices: [1, 999],
        currentPage: 0,
        pageSize: MAX_PAGE_VALUE,
        sortByPrice: false
	})
	const [sortByPrice, setSortByPrice] = useState<boolean>(false)
    const { currentPage, totalElements, handleChangePagination, resetPagination } = usePagination();
    const { searchValue, setSearchValue, onSearch, resetSearch } = useSearch(resetPagination);

	useEffect(() => {
		dispatch(fetchFoodsByFilterParams(filterParams))

		return () => {
			dispatch(resetFoodsState())
		}
	}, [])

	useEffect(() => {
		resetPagination()
	}, [filterParams, sortByPrice])

    const changePagination = (page: number): void => {
        if (searchValue) {
            dispatch(fetchFoodsByInputText({ text: searchValue, currentPage: page - 1, pageSize: MAX_PAGE_VALUE}))
        } else {
            dispatch(fetchFoodsByFilterParams({ ...filterParams, sortByPrice, currentPage: page - 1}))
        }
        handleChangePagination(page)
    }

    const handleChangeSortPrice = (value: boolean): void => {
        dispatch(fetchFoodsByFilterParams({ ...filterParams, sortByPrice: value, currentPage: 0 }))
        setSortByPrice(value)
        resetSearch()
    }

    const onChangeCheckbox = (checkedValues: string[]): void => {
        setFilterParams(prevState => {
            const newCategoriesFilter = checkedValues.length > 0 ? checkedValues : undefined;
            const filter = { ...prevState, categories: newCategoriesFilter, currentPage: 0}
            dispatch(fetchFoodsByFilterParams(filter))
            return filter
        })
        resetSearch();
    }

    const onChangeSlider = (values: number[]): void => {
        setFilterParams(prevState => {
            const filter = { ...prevState, prices: values, currentPage: 0}
            dispatch(fetchFoodsByFilterParams(filter))
            return filter
        })
        resetSearch();
    }

    return (
        <article>
            <CoverPage title='Shop' currentPage='Shop' listPath={[{title: "Home", path: '/'}]} />

            <section className='flex gap-x-8 items-center pt-10 mb-6 max-lg:flex-col max-lg:items-start max-lg:gap-y-3 max-lg:pt-0'>
                <div className='flex items-center gap-x-2'>
                    <p>Sort By</p>
                    <Select
                        defaultValue={sortByPrice}
                        style={{ width: 160 }}
                        options={[
                            { value: true, label: 'Ascending Price' },
                            { value: false, label: 'Descending Price' },
                        ]}
                        onChange={handleChangeSortPrice}
                    />
                </div>

            </section>

            <section className='flex gap-x-10'>
                <div className='basis-9/12 flex flex-col items-center max-lg:basis-full max-lg:w-full '>
                    <div className='grid sm:grid-cols-1 lg:grid-cols-2  2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-10 w-full max-lg:gap-0 max-lg:gap-y-6'>
                        {
                            isFoodsLoading ? (
                                <Spinner/>
                            ) : (
                                foods.map((food) => (
                                    <ItemFood key={food.id} food={food}/>
                                ))
                            )
                        }
                    </div>
                    
                    <ShopPagination currentPage={currentPage} pageSize={MAX_PAGE_VALUE} 
                        totalElements={totalElements} onChange={changePagination}
                    />
                </div>

                <div className='basis-3/12 bg-65 max-lg:hidden '>
                    <ShopSideBar onChangeCheckbox={onChangeCheckbox} onChangeSlider={onChangeSlider}
                        onSearch={onSearch} searchValue={searchValue} setSearchValue={setSearchValue}
                    />
                </div>
            </section>
        </article>
    )
}

export default Shop