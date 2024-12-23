import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchFoodsByInputText } from '../state/foods/foods-thunk';
import { MAX_PAGE_VALUE } from './usePagination';

export const useSearch = (resetPagination: () => void) => {
  const dispatch = useDispatch<any>();
  const [searchValue, setSearchValue] = useState<string>("");

  const resetSearch = () => setSearchValue("")
  
  const onSearch = (searchValue: string): void => {
    dispatch(fetchFoodsByInputText({ text: searchValue, currentPage: 0, pageSize: MAX_PAGE_VALUE}))
    resetPagination()
  }

  return {
    searchValue,
    setSearchValue,
    resetSearch,
    onSearch
  }
}
