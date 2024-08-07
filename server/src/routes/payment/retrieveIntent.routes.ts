import { Response, Request } from 'express'
import Stripe from 'stripe'

export const retrieveIntent = async (req: Request, res: Response) => {
  const { clientSecret } = req.query

  if (!clientSecret || typeof clientSecret !== 'string') {
    return res.status(400).send('Invalid request. Missing required parameter.')
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).send('Server error. Please try again later.')
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20'
    })

    // Extract PaymentIntent ID from clientSecret
    const paymentIntentId = clientSecret.split('_secret_')[0]
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    res.send(paymentIntent)
  } catch (error) {
    console.error('Error retrieving payment intent:', error)
    res
      .status(500)
      .send('Unable to retrieve payment intent. Please try again later.')
  }
}
