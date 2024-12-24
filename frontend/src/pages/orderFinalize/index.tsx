import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder } from '../../state/order/order-selector';
import { resetCartState } from '../../state/cart/cart-slice';
import CoverPage from '../../components/CoverPage';
import { resetOrderState } from '../../state/order/order-slice';

const OrderFinalize = () => {
  const dispatch = useDispatch<any>();
  const order = useSelector(selectOrder)

  useEffect(() => {
    dispatch(resetCartState())

    return () => {
      dispatch(resetOrderState())
    }
  }, [])

  return (
    <div className='min-h-screen'>
      <CoverPage title='Order Finalize' currentPage='Order Finalize' listPath={[{title: "Home", path: '/'}]}/>
      <div className='text-center'>
        <p className='text-3xl mb-5'>Thank you for your order!</p>
        <p className='text-lg'>Your order number is: {order.id}</p>
      </div>
    </div>
  )
}

export default OrderFinalize