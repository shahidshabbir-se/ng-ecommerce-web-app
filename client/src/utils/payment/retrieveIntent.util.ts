import axios from 'axios'

export async function retrieveIntent(clientSecret: string) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/payment/retrieveIntent?clientSecret=${clientSecret}`
    )
    // Ensure the response includes a 'status' property
    const { status } = response.data
    if (status) {
      return { status }
    } else {
      throw new Error('Status not found in the response')
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message)
    } else {
      console.error('Unexpected error:', error)
    }
    // Return an object with the error message for handling in the component
    return { error: error.message || 'An error occurred while retrieving the payment intent' }
  }
}
