import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { selectIsOrderLoaded, selectIsOrderLoading, selectOrder, selectOrderItems } from "../../state/order/order-selector";
import { useEffect } from "react";
import { fetchOrderById, fetchOrderItemsByOrderId } from "../../state/order/order-thunk";
import { resetOrderState } from "../../state/order/order-slice";
import ContentTitle from "./components/ContentTitle";
import { InfoCircleOutlined, ShoppingOutlined } from "@ant-design/icons";
import AccountDataItem from "./components/AccountDataItem";
import { Table } from "antd";
import { OrderItemResponse } from "../../types/order";
import Spinner from "../../components/Spinner";


const ManageUserOrder = () => {
  const dispatch = useDispatch<any>();
  const params = useParams<{ id: string}>();
  const order = useSelector(selectOrder);
  const orderItems = useSelector(selectOrderItems)
  const isOrderLoading = useSelector(selectIsOrderLoading)
  const isOrderLoaded = useSelector(selectIsOrderLoaded)
  const { id, email, firstName, lastName, totalPrice, postIndex, phoneNumber, date, city, address } = order;

  useEffect(() => {
    dispatch(fetchOrderById(params.id!))

    return () => {
      dispatch(resetOrderState())
    }
  }, [])

  useEffect(() => {
    if (isOrderLoaded) {
      dispatch(fetchOrderItemsByOrderId(params.id!))
    }
  }, [isOrderLoaded])

  return (
    <div>
      {
        isOrderLoading ? (
          <Spinner/>
        ) : (
          <>
            <div className="mb-5 flex justify-center">
              <ContentTitle title={`Order #${id}`} icon={<ShoppingOutlined/>} textSize="text-2xl"/>
            </div>
            <div className="flex gap-x-8 mb-3">
              <div className="basis-1/2">
                <div className="mb-3">
                  <ContentTitle title={"Customer information"} icon={<InfoCircleOutlined/>}/>
                </div>
                <AccountDataItem title="Email" text={email}/>
                <AccountDataItem title="First name" text={firstName}/>
                <AccountDataItem title="Last name" text={lastName}/>
                <AccountDataItem title="City" text={city}/>
                <AccountDataItem title="Address" text={address}/>
                <AccountDataItem title="Phone number" text={phoneNumber}/>
                <AccountDataItem title="Post index" text={postIndex}/>
              </div>
              <div className="basis-1/2">
                  <div className="mb-3">
                    <ContentTitle title={"Order information"} icon={<InfoCircleOutlined/>}/>
                  </div>
                  <AccountDataItem title="Order id" text={id}/>
                  <AccountDataItem title="Date" text={date}/>
                  <div className="font-bold">
                    <ContentTitle title={`Order summary: ${totalPrice}.0$`} textSize="text-2xl"/>
                  </div>
              </div>
            </div>
            <Table
              loading={isOrderLoading}
              rowKey={"id"}
              dataSource={orderItems}
              pagination={false}
              columns={[
                {
                  title: "Food Id",
                  dataIndex: "id",
                  key: "id"
                },
                {
                  title: "Category",
                  dataIndex: "category",
                  key: "category",
                  render: (_, order: OrderItemResponse) => order.food.category
                },
                {
                  title: "Food Name",
                  dataIndex: "name",
                  key: "name",
                  render: (_, order: OrderItemResponse) => order.food.name
                },
                {
                  title: "Quantity",
                  dataIndex: "quantity",
                  key: "quantity",
                },
                {
                  title: "Price",
                  dataIndex: "price",
                  key: "price",
                  render: (_, order: OrderItemResponse) => `${order.food.price}.0 $`
                },
                {
                  title: "Amount",
                  dataIndex: "amount",
                  key: "amount",
                  render: (_, order: OrderItemResponse) => `${order.amount}.0 $`
                }
              ]}
            />
          </>
        )
      }
    </div>
  )
}

export default ManageUserOrder