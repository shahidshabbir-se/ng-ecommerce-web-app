import axios from 'axios'

export async function getAddress(userId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/address/getAddress?userId=${userId}`
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}
