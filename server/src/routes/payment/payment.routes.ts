import { Request, Response } from 'express'
import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()

export const createPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, amount, paymentMethodId } = req.body
  if (
    !req.body ||
    !req.body.email ||
    !req.body.amount ||
    !req.body.paymentMethodId
  ) {
    res.status(400).send('Invalid request. Missing required parameter.')
    return
  }

  if (process.env.STRIPE_SECRET_KEY === undefined) {
    res.status(500).send('Server error. Please try again later.')
    return
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      description: `Payment for ${email}`,
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never' // Prevent redirect-based payment methods
      }
    })
    res.send({
      message: 'Payment created successfully',
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    console.error('Error creating payment:', error)
    res.status(500).send('Unable to create payment. Please try again later.')
  }
}
