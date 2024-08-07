import React, { useState } from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { createPayment } from '@utils/payment/createPayment.util'
import icons from '@icons'
import { retrieveIntent } from '@utils/payment/retrieveIntent.util'
import Alert from '@mui/material/Alert'

interface PaymentProps {
  email: string | null
  userId: number | null
  handleOrder: () => void
  total: number
  orderSuccess: boolean
  selectedAddressId: number | null
}

const Payment: React.FC<PaymentProps> = ({
  email,
  userId,
  handleOrder,
  total,
  orderSuccess,
  selectedAddressId
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [amount, setAmount] = useState<number>()
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    setAmount(total)
    if (amount === undefined) {
      setPaymentMessage('Please add items to the cart.')
      setTimeout(() => {
        setPaymentMessage(null)
      }, 2000)
      return
    }
    event.preventDefault()
    if (!stripe || !elements) return

    setPaymentMessage(null)

    if (email === null) {
      setPaymentMessage('Please log in to proceed with the payment.')
      setTimeout(() => {
        setPaymentMessage(null)
      }, 2000)
      return
    }

    if (!userId) {
      setPaymentMessage('Please log in to proceed with the payment.')
      setTimeout(() => {
        setPaymentMessage(null)
      }, 2000)
      return
    }
    console.log(amount)
    if (!selectedAddressId) {
      setPaymentMessage('Please select a delivery address.')
      setTimeout(() => {
        setPaymentMessage(null)
      }, 2000)
      return
    }

    try {
      const cardNumberElement = elements.getElement(CardNumberElement)
      const cardExpiryElement = elements.getElement(CardExpiryElement)
      const cardCvcElement = elements.getElement(CardCvcElement)

      if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
        throw new Error('One or more card elements are missing.')
      }

      // Create payment method
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: 'card',
          card: cardNumberElement
        })

      if (paymentMethodError) {
        setPaymentMessage(
          paymentMethodError.message ?? 'Payment method creation failed.'
        )
        setTimeout(() => {
          setPaymentMessage(null)
        }, 2000)
        return
      }

      // Create payment
      const { message, clientSecret, error } = await createPayment(
        amount,
        email,
        paymentMethod.id
      )

      if (error) {
        setPaymentMessage(error.message ?? 'Payment creation failed.')
        setTimeout(() => {
          setPaymentMessage(null)
        }, 2000)
        return
      }

      // Retrieve payment intent
      const { error: retrieveError, status } =
        await retrieveIntent(clientSecret)

      if (retrieveError) {
        setPaymentMessage(
          retrieveError.message ?? 'Payment intent retrieval failed.'
        )
        setTimeout(() => {
          setPaymentMessage(null)
        }, 2000)
        return
      }

      if (!status) {
        setPaymentMessage('Payment intent status is not available.')
        setTimeout(() => {
          setPaymentMessage(null)
        }, 2000)
        return
      }

      if (status === 'succeeded') {
        setPaymentMessage('Payment successful.')
        setTimeout(() => {
          setPaymentMessage(null)
        }, 2000)
        handleOrder() // Complete the order process
        return
      }

      // Confirm the payment
      const { error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
            billing_details: { email }
          }
        }
      )

      if (confirmError) {
        setPaymentMessage(
          confirmError.message ?? 'Payment confirmation failed.'
        )
        setTimeout(() => {
          setPaymentMessage(null)
        }, 2000)
      } else {
        // Payment succeeded
        setPaymentMessage('Payment successful.')
        setTimeout(() => {
          setPaymentMessage(null)
        }, 2000)
        handleOrder() // Complete the order process
      }
    } catch (error: any) {
      setPaymentMessage(error.message ?? 'An error occurred.')
      setTimeout(() => {
        setPaymentMessage(null)
      }, 2000)
    }
  }

  return (
    <div className='mb-4 bg-white px-5 py-6 text-lg'>
      <strong className='font-extraBold text-xl'>Payment</strong>
      <p className='font-regular text-[.81rem] leading-5 text-[#687282]'>
        All fields are required unless marked otherwise.
      </p>
      <form className='mt-2 grid gap-4' onSubmit={handleSubmit}>
        <label className='grid'>
          <span className='font-bold'>Email</span>
          <input
            type='email'
            className='h-10 rounded-lg border border-[#b9c4c9] px-2 py-[5px] text-[1em] outline-none'
            placeholder='Your Email'
            value={email || ''}
            readOnly
          />
        </label>
        <label className='font-bold'>
          Card Number
          <div className='flex h-10 items-center gap-2 rounded-lg border border-[#b9c4c9] px-2 py-[5px] text-[1em] outline-none'>
            <CardNumberElement className='w-full' />
            <icons.visa className='size-10' />
          </div>
          <p className='mt-1 font-bold text-base'>
            For testing, use{' '}
            <span className='font-extraBold'>4242 4242 4242 4242</span>
          </p>
        </label>
        <div className='flex w-full justify-between gap-4'>
          <label className='w-full font-bold'>
            Expiry Date
            <div className='flex h-10 items-center rounded-lg border border-[#b9c4c9] px-2 py-[5px] text-[1em] outline-none'>
              <CardExpiryElement className='w-full' />
              <icons.calendar className='size-8' />
            </div>
          </label>
          <label className='w-full font-bold'>
            Security Code
            <div className='flex h-10 items-center rounded-lg border border-[#b9c4c9] px-2 py-[5px] text-[1em] outline-none'>
              <CardCvcElement className='w-full' />
              <icons.creditCard className='size-10' />
            </div>
          </label>
        </div>
        <br />
        <button
          className='-mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#00112c] font-bold text-xl text-white disabled:opacity-50'
          type='submit'
          disabled={!stripe}
        >
          <icons.lock className='size-5' />
          Pay
        </button>
      </form>
      {paymentMessage && (
        <div className='absolute left-0 top-0 h-full w-full bg-blurbg'>
          <div className='flex h-full items-center justify-center'>
            <Alert severity='error'>{paymentMessage}</Alert>
          </div>
        </div>
      )}
    </div>
  )
}

export default Payment
