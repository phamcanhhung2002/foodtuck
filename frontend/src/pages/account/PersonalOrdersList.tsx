import { ShoppingOutlined } from "@ant-design/icons"
import ContentTitle from "./components/ContentTitle"
import { useDispatch, useSelector } from "react-redux"
import { selectIsOrdersLoading, selectOrders, selectTotalElements } from "../../state/orders/orders-selector";
import { useEffect } from "react";
import { fetchUserOrders } from "../../state/orders/orders-thunk";
import { MAX_PAGE_VALUE } from "../../hooks/usePagination";
import { resetOrders } from "../../state/orders/orders-slice";
import { useTablePagination } from "../../hooks/useTablePagination";
import { OrderResponse } from "../../types/order";
import { PagingRequest } from "../../types/types";
import { Table } from "antd";
import { Link } from "react-router-dom";

const PersonalOrdersList = () => {
  const dispatch = useDispatch<any>();
  const orders = useSelector(selectOrders)
  const isOrdersLoading = useSelector(selectIsOrdersLoading)
  const totalElements = useSelector(selectTotalElements)
  const { currentPage, pageSize, handleTableChange } = useTablePagination<OrderResponse, PagingRequest>(fetchUserOrders);

  useEffect(() => {
    dispatch(fetchUserOrders({ page: 0, size: MAX_PAGE_VALUE}))

    return () => {
      dispatch(resetOrders());
    }
  }, [])

  return (
    <div>
      <div className="mb-3">
        <ContentTitle title="List of all orders" icon={<ShoppingOutlined/>}/>
      </div>
      <Table
        rowKey={"id"}
        onChange={handleTableChange}
        loading={isOrdersLoading}
        pagination={{
          current: currentPage,
          total: totalElements,
          pageSize,
          position: ["bottomRight", "topRight" ]
        }}
        dataSource={orders}
        columns={[
          {
            title: "Order №",
            dataIndex: "id",
            key: "id"
          },
          {
            title: "Date",
            dataIndex: "date",
            key: "date",
            sorter: (a, b) => a.date.localeCompare(b.date)
          },
          {
            title: "Customer",
            dataIndex: "firstName",
            key: "firstName",
            render: (_, order: OrderResponse) => `${order.firstName} ${order.lastName}`
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email"
          },
          {
            title: "Actions",
            dataIndex: "operations",
            key: "operations",
            render: (_, order: OrderResponse) => <Link to={`${order.id}`}>Show more</Link>
          }
        ]}
      />
    </div>
  )
}

export default PersonalOrdersList
