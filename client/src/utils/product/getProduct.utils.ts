import axios from 'axios'

// Define the types for categoryId and productId
export default async function getProduct(
  categoryId: number,
  productId: number
): Promise<any> {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/product/getProduct/${categoryId}/${productId}`
    )
    return res.data
  } catch (error) {
    console.error('Error fetching product data:', error)
    throw error // Rethrow the error to handle it outside of this function
  }
}
