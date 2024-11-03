import React from 'react'
import Checkout from './checkout'
import Promo from './promo'
const Page = () => {
  return (
    <div className='flex flex-col bg-[#F3F4F6] px-5 py-5 md:py-20'>
      <Checkout Promo={<Promo />} />
    </div>
  )
}

export default Page
