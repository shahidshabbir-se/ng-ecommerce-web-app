/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { useEffect, useState, Fragment } from 'react'
import { productData } from '@interfaces/product.interfaces'
import { CartItem } from '@interfaces/cart.interfaces'

const Page = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>()
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await fetch(
        'http://localhost:8080/api/cart/getCartItems?userId=1'
      )
      const data = await response.json()
      setCartItems(data)
      console.log(data)
    }

    fetchCartItems()
  }, [])

  useEffect(() => {
    if (cartItems) {
      const total = cartItems.reduce((acc, item) => {
        return acc + item.product.salePrice * item.quantity
      }, 0)
      setTotalPrice(total)
    }
  }, [cartItems])

  return (
    <div>
      {cartItems?.map((cartItem) => {
        return (
          <Fragment key={cartItem.productId}>
            <h3>{cartItem.product.name}</h3>
            <p>Quantity: {cartItem.quantity}</p>
            {cartItem.product.salePrice !== cartItem.product.regPrice && (
              <p>Sale Price: ${cartItem.product.salePrice}</p>
            )}
            <img src={cartItem.product.color} alt='' />
            <img
              className='size-10'
              src={cartItem.product.imageUrl}
              alt={cartItem.product.name}
            />
            {totalPrice > 0 && <h3>Total: ${totalPrice}</h3>}
          </Fragment>
        )
      })}
    </div>
  )
}

export default Page
