'use server'
import React from 'react'

const Promo = () => {
  return (
    <div className='mb-4 bg-white px-5 py-6 font-extraBold'>
      <h1 className='mb-4 text-xl'>Promo Code</h1>
      <form className='mb-3 flex justify-between border' action=''>
        <input
          type='text'
          placeholder='Enter Promo Code'
          className='w-full p-1 font-bold'
        />
        <button className='border-l px-5 py-1.5 text-lg'>Apply</button>
      </form>
    </div>
  )
}

export default Promo
