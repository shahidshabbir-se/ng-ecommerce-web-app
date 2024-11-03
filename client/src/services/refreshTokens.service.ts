import axios from 'axios'

const refreshTokens = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8080/auth/refreshTokens',
      { withCredentials: true }
    )
  } catch (error: any) {
    return `An error occurred while refreshing tokens: ${error.message}`
  }
}
