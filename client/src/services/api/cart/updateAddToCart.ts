import axios from 'axios'
import { AddToCart } from '@interfaces/cart.interfaces'

export async function updateAddToCart(cart: AddToCart) {
  try {
    const { userId, productId, quantity, variantId, size } = cart
    const response = await axios.post(
      'http://localhost:8080/api/cart/updateOrAddCartItem',
      {
        userId,
        productId,
        quantity,
        variantId,
        size
      }
    )
    console.log('response', response)
    return response.data
  } catch (error: any) {
    if (error.response) {
      console.log('Server responded with error:', error.response.data)
      return null
    } else if (error.request) {
      console.log('No response received:', error.request)
      return null
    } else {
      console.log('Error setting up request:', error.message)
      return null
    }
  }
}
