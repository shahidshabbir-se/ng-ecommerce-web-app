import axios from 'axios'

export const verifyByToken = async (token: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}api/user/verifyUserByToken`,
      {
        headers: {
          access_token: token
        }
      }
    )
    return response.data
  } catch (error) {
    return error.response.data
  }
}
