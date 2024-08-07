import React from 'react'

interface PriceProps {
  total: number
  orderPrice: number
  deliveryPrice: number
}

const Price: React.FC<PriceProps> = ({ total, orderPrice, deliveryPrice }) => {
  return (
    <div className='mb-4 bg-white px-5 py-6 font-bold text-lg'>
      <h1 className='mb-4 text-xl'>Order Summary</h1>
      <div className='flex justify-between pb-3'>
        <p>Order</p>
        <p>${orderPrice.toFixed(2)}</p>
      </div>
      <div className='flex justify-between pb-3'>
        <p>Delivery</p>
        <p>${deliveryPrice.toFixed(2)}</p>
      </div>
      <hr className='pb-3' />
      <div className='flex justify-between font-extraBold'>
        <p>Total</p>
        <p>${(orderPrice + deliveryPrice).toFixed(2)}</p>
      </div>
    </div>
  )
}

export default Price
