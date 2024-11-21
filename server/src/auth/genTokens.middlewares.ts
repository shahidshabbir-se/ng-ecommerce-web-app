import generateEncryptedToken from '@services/genEncryptedToken.services'

async function genTokens(userId: number) {
  const accessEncryptedToken = await generateEncryptedToken(
    process.env.ACCESS_JWT_SECRET as string,
    userId,
    '1h'
  )
  const refreshEncryptedToken = await generateEncryptedToken(
    process.env.REFRESH_JWT_SECRET as string,
    userId,
    null
  )

  return {
    accessEncryptedToken,
    refreshEncryptedToken
  }
}

export default genTokens
