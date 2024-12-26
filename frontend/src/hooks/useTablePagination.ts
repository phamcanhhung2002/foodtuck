import { AsyncThunkAction } from "@reduxjs/toolkit"
import { HeaderResponse } from "../types/types"
import { useDispatch } from "react-redux"
import { TablePaginationConfig } from "antd";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { useState } from "react";

export const MAX_PAGE_VALUE = 10;

export const useTablePagination = <T, S>(
  getPaginationItems: (pageRequest: S) => AsyncThunkAction<HeaderResponse<T>, S, {}>,
  userEmail?: string
) => {
  const dispatch = useDispatch<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
    extra: TableCurrentDataSource<T>
  ): void => {
    if (extra.action == "paginate") {
      dispatch(
        getPaginationItems(
          userEmail ? {
            email: userEmail,
              page: pagination.current! - 1,
              size: MAX_PAGE_VALUE
          } as any : { 
            page: pagination.current! - 1,
            size: MAX_PAGE_VALUE
          } as any
        )
      )
      setCurrentPage(pagination.current!)
    }
  }

  return { currentPage, pageSize: MAX_PAGE_VALUE , handleTableChange };
}