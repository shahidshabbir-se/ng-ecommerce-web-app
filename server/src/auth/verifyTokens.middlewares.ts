import generateDecryptedData from '@services/genDecryptedData.services'
import generateEncryptedToken from '@services/genEncryptedToken.services'

async function verifyTokens(
  accessToken: string | null,
  refreshToken: string | null,
  userId: number | null
) {
  try {
    if (!accessToken && refreshToken) {
      const decryptedData = await generateDecryptedData(
        process.env.REFRESH_TOKEN_SECRET as string,
        refreshToken as string
      ) as unknown as { userId: number }
      if (decryptedData.userId !== userId) {
        throw new Error('Invalid refresh token')
      }
      return generateEncryptedToken(
        process.env.ACCESS_TOKEN_SECRET as string,
        userId as number
      )
    }
    if (!accessToken && !refreshToken && userId) {
      const refreshToken = generateEncryptedToken(
        process.env.REFRESH_TOKEN_SECRET as string,
        userId
      )
      const accessToken = generateEncryptedToken(
        process.env.ACCESS_TOKEN_SECRET as string,
        userId
      )
      return { accessToken, refreshToken }
    }
  } catch (error) {
    console.error('Error verifying tokens:', error)
    throw error
  }
}

export default verifyTokens
