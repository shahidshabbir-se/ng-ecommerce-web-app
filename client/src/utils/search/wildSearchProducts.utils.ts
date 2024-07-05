import axios from 'axios'

export async function getProductsByTerm(term: string, startPoint: number) {
  const url = `http://localhost:8080/api/category/getProductsByTerm?term=${term}&startPoint=${startPoint}`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          `Error: ${error.response.status} - ${error.response.data}`
        )
        throw new Error(
          `Failed to fetch product data: ${error.response.statusText}`
        )
      } else if (error.request) {
        console.error('Error: No response received from the server')
        throw new Error('Failed to fetch product data: No response from server')
      } else {
        console.error('Error: Request setup issue', error.message)
        throw new Error('Failed to fetch product data: Request setup issue')
      }
    } else {
      console.error('Error: General error', error)
      throw new Error('Failed to fetch product data: General error')
    }
  }
}
