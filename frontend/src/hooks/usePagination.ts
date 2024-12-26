import { useSelector } from "react-redux";
import { selectTotalElements } from "../state/foods/foods-selector";
import { useState } from "react";

interface UsePagination {
  currentPage: number,
  totalElements: number,
  handleChangePagination: (page: number) => void,
  resetPagination: () => void
}

export const MAX_PAGE_VALUE = 6;

export const usePagination = (): UsePagination  => {
  const totalElements = useSelector(selectTotalElements)
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChangePagination = (page: number): void => {
    setCurrentPage(page);
  }

  const resetPagination = (): void => {
    setCurrentPage(1)
  }

  return { currentPage, totalElements, handleChangePagination, resetPagination };
}