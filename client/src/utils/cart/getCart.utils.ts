import axios from 'axios'

export async function getCart(userId: number) {
  try {
    const response = await axios.get(`
      http://localhost:8080/api/cart/getCartItems?userId=${userId}
      `)
    return response.data
  } catch (error) {
    return null
  }
}
