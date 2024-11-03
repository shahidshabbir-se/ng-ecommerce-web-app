'use client'
import React, { useEffect, useState } from 'react'
import { useGlobalUserStore } from '@store/globalUser/store'
import Address from './address'
import Payment from './payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { getCart } from '@utils/cart/getCart.utils'
import Price from './price'
import { createOrder } from '@utils/order/createOrder.util'
import { Order, OrderItem } from '@interfaces/order.interfaces'
import CircularProgress from '@mui/material/CircularProgress'
import { CartItem } from '@interfaces/cart.interfaces'
import Alert from '@mui/material/Alert'

interface CheckoutProps {
  Promo: JSX.Element
}

const Checkout: React.FC<CheckoutProps> = ({ Promo }) => {
  const userId = useGlobalUserStore((state) => state.userId)
  const email = useGlobalUserStore((state) => state.email)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false)
  const [orderError, setOrderError] = useState<string | null>(null)
  const [orderLoading, setOrderLoading] = useState<boolean>(false)
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  )
  const [loginError, setLoginError] = useState<string | null>(
    'Please login to continue.'
  )

  useEffect(() => {
    if (userId) {
      setLoginError(null)
      setTimeout(() => {
        setLoginError(null)
      }, 2000)
    } else {
      setLoginError('Please login to continue.')
      setTimeout(() => {
        setLoginError(null)
      }, 2000)
    }
  }, [userId])

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('Stripe publishable key not found')
  }

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  )

  const fetchCartItems = async () => {
    if (!userId) return
    try {
      setLoading(true)
      const fetchedCartItems = await getCart(userId)
      setCartItems(fetchedCartItems)
    } catch (error) {
      console.error('Error fetching cart items:', error)
      setError('Unable to fetch cart items. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const calculateTotalPrice = (cartItems: CartItem[]): number => {
    return cartItems.reduce((accumulator, item) => {
      const { quantity, product } = item
      const price = product.salePrice ?? product.regPrice
      return accumulator + quantity * price
    }, 0)
  }

  const total = calculateTotalPrice(cartItems)

  useEffect(() => {
    fetchCartItems()
  }, [userId])

  const handleOrder = async () => {
    if (!userId || !selectedAddressId) {
      setOrderError('Please select a delivery address.')
      setTimeout(() => {
        setOrderError(null)
      }, 2000)
      return
    }
    try {
      setOrderLoading(true)
      const order: Order = {
        userId,
        addressId: selectedAddressId,
        totalAmount: total,
        products: cartItems.map(
          (item) =>
            ({
              productId: item.productId,
              quantity: item.quantity,
              size: Array.isArray(item.product.size)
                ? item.product.size[0]
                : item.product.size, // Convert array to string
              variantId: item.product.variantId
            }) as OrderItem
        )
      }
      const response = await createOrder(order)
      if (response.message === 'Order created successfully') {
        setOrderSuccess(true)
        setTimeout(() => {
          setOrderSuccess(false)
        }, 2000)
        return 'Order placed successfully'
      }
    } catch (error) {
      console.error('Error creating order:', error)
      setOrderError('Unable to create order. Please try again later.')
      setTimeout(() => {
        setOrderError(null)
      }, 2000)
    } finally {
      setOrderLoading(false)
    }
  }

  return (
    <div className='relative mx-auto flex flex-col md:flex-row'>
      <div className='mx-2 md:w-1/2'>
        {Promo}
        {userId && (
          <Address
            userId={userId}
            selectedAddressId={selectedAddressId}
            onSelectAddress={setSelectedAddressId}
          />
        )}
      </div>
      <div className='mx-2 md:w-1/2'>
        <Price total={total} orderPrice={total + 2} deliveryPrice={2} />
        <Elements stripe={stripePromise}>
          <Payment
            total={total}
            email={email}
            userId={userId}
            orderSuccess={orderSuccess}
            handleOrder={handleOrder}
            selectedAddressId={selectedAddressId}
          />
        </Elements>
        {loading || orderLoading ? (
          <div className='absolute left-0 top-0 h-full w-full bg-blurbg'>
            <div className='flex h-full items-center justify-center'>
              <CircularProgress />
            </div>
          </div>
        ) : orderError ? (
          <div className='absolute left-0 top-0 h-full w-full bg-blurbg'>
            <div className='flex h-full items-center justify-center'>
              <Alert severity='error'>{orderError}</Alert>
            </div>
          </div>
        ) : orderSuccess ? (
          <div className='absolute left-0 top-0 h-full w-full bg-blurbg'>
            <div className='flex h-full items-center justify-center'>
              <Alert severity='success'>Order placed successfully!</Alert>
            </div>
          </div>
        ) : error ? (
          <div className='absolute left-0 top-0 h-full w-full bg-blurbg'>
            <div className='flex h-full items-center justify-center'>
              <Alert severity='error'>{error}</Alert>
            </div>
          </div>
        ) : loginError ? (
          <div className='absolute left-0 top-0 h-full w-full bg-blurbg'>
            <div className='flex h-full items-center justify-center'>
              <Alert severity='error'>{loginError}</Alert>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Checkout
