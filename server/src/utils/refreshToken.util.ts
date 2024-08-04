// utils/tokenUtils.ts
import jwt from 'jsonwebtoken'
import { encryptToken, decryptToken } from '../services/token.service.js'
import { generateToken } from '../utils/jwt.util.js'
import { JwtPayload } from '@interfaces/jwt.interface.js'

export async function refreshTokens(accessToken: string, refreshToken: string) {
  if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT secrets are required')
  }
  if (!accessToken) {
    throw new Error('Access token is required')
  }

  try {
    // Decrypt and verify the access token
    const decryptedAccessToken = decryptToken(accessToken)
    const accessPayload = jwt.verify(
      decryptedAccessToken,
      process.env.JWT_ACCESS_SECRET as string
    ) as JwtPayload

    // Generate a new access token
    const newAccessToken = generateToken(
      { userID: accessPayload.userID },
      process.env.JWT_ACCESS_SECRET,
      '1h'
    )

    let newRefreshToken = refreshToken
    if (refreshToken) {
      // Decrypt and verify the refresh token
      const decryptedRefreshToken = decryptToken(refreshToken)
      const refreshPayload = jwt.verify(
        decryptedRefreshToken,
        process.env.JWT_REFRESH_SECRET as string
      ) as JwtPayload

      // Check if the refresh token needs to be refreshed
      const refreshTokenExp = refreshPayload.exp ? refreshPayload.exp * 1000 : 0
      const now = Date.now()
      const oneDay = 24 * 60 * 60 * 1000 // 1 day in milliseconds

      if (refreshTokenExp - now < oneDay) {
        newRefreshToken = generateToken(
          { userID: refreshPayload.userID },
          process.env.JWT_REFRESH_SECRET,
          '7d'
        )
      }
    } else {
      // Generate a new refresh token if not provided
      newRefreshToken = generateToken(
        { userID: accessPayload.userID },
        process.env.JWT_REFRESH_SECRET,
        '7d'
      )
    }

    // Encrypt the new tokens
    const encryptedAccessToken = encryptToken(newAccessToken)
    const encryptedRefreshToken = encryptToken(newRefreshToken)

    return {
      accessToken: encryptedAccessToken,
      refreshToken: encryptedRefreshToken
    }
  } catch (error) {
    return 
  }
}
