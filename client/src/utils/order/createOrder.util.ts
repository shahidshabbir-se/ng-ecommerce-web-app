import axios from 'axios'
import { Order } from '@interfaces/order.interfaces'

export async function createOrder(order: Order) {
  const { userId, addressId, totalAmount, products } = order
  try {
    const response = await axios.post(
      'http://localhost:8080/api/order/createOrder',
      {
        userId,
        addressId,
        totalAmount,
        products
      }
    )
    console.log('Order created:', response.data)
    return response.data
  } catch (error) {
    console.error('Error creating order:', error)
    return { error: 'An error occurred while creating the order' }
  }
}
