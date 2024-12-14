import axios from 'axios'

export function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error(
        `Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`
      )
      throw new Error(error.response.data.message)
    } else if (error.request) {
      console.error('Error: No response received from the server')
      throw new Error('Failed to fetch data: No response from server')
    } else {
      console.error('Error: Request setup issue', error.message)
      throw new Error('Failed to fetch data: Request setup issue')
    }
  } else {
    console.error('Error: General error', error)
    throw new Error('Failed to fetch data: General error')
  }
}
