import axios from 'axios'

const apiClient = axios.create({
  baseURL: `${process.env.SERVER_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient
