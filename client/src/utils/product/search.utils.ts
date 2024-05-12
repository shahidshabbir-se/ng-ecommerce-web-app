import axios from 'axios'

export async function getProductByTerm(term: string, categoryId?: number) {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/product/getProductByTerm?term=${term}&categoryId=${categoryId}`
    )
    console.log('Product data:', res.data)
    return res.data
    
    } catch (error) {
        console.error('Error fetching product data:', error)
        throw error // Rethrow the error to handle it outside of this function
    }
}