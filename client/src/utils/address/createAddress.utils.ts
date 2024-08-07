import axios from 'axios'
import { CreateAddress } from '@interfaces/address.interfaces'

export async function createAddress(address: CreateAddress) {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/address/createAddress',
      address
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}
