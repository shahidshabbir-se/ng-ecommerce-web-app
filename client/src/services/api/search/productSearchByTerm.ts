import axios from 'axios'
import { handleApiError } from '@api/errorHandler'
import apiClient from '@api/apiClient'

export async function productSearchByTerm(term: string, startPoint: number) {
  const url = `http://localhost:8080/api/product/getProductsByTerm?term=${term}&startPoint=${startPoint}`
  try {
    const response = await apiClient.get(url)
    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
