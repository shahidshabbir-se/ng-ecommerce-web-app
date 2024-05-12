import { Response, Request, NextFunction } from 'express'
import genTokens from '@auth/genTokens.middlewares'
import passport from '@configs/passport.config'
import generateDecryptedData from '@services/genDecryptedData.services'
import { prisma } from '@configs/prisma.config'
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'

export async function verifyUserByCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    'local',
    async (
      err: Error,
      user: {
        userId: number
        email: string
        password: string
      }
    ) => {
      try {
        if (err || !user) {
          return res.status(401).json({ message: 'Invalid user or password' })
        }
        const tokens = await genTokens(user.userId)
        await prisma.user.update({
          where: {
            userId: user.userId
          },
          data: {
            refreshToken: tokens.refreshEncryptedToken
          }
        })
        res.cookie('accessToken', tokens.accessEncryptedToken, {
          httpOnly: true
        })
        res.cookie('refreshToken', tokens.refreshEncryptedToken, {
          httpOnly: true
        })
        return res.send('Successfully Logged In')
      } catch (error) {
        console.error('Error verifying user:', error)
        return res.status(401).json({ message: 'Invalid user or password' })
      }
    }
  )(req, res, next)
}

export async function verifyUserFromToken(req: Request, res: Response) {
  try {
    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken

    if (!accessToken && !refreshToken) {
      return res.status(401).json({
        message:
          'Authentication credentials are missing or expired. Please log in again.'
      })
    }

    if (!accessToken && refreshToken) {
      console.log('No access token but refresh token found')
      const refreshTokenData = await generateDecryptedData(refreshToken)
      console.log('Refresh token data:', refreshTokenData)
      const user = await prisma.user.findUnique({
        where: {
          userId: refreshTokenData.decryptedData
        }
      })

      if (!user) {
        return res.status(401).json({ message: 'Please Login Again' })
      }

      const decodedRefreshTokenEncryptedKey = jwt.decode(
        user.refreshToken as string
      )
      if (
        (decodedRefreshTokenEncryptedKey as JwtPayload).encryptedKey ===
        refreshTokenData.encryptedData.encryptedKey
      ) {
        console.log('User verified from refresh token')
        // Generate new tokens
        const tokens = await genTokens(user.userId)
        await prisma.user.update({
          where: {
            userId: user.userId
          },
          data: {
            refreshToken: tokens.refreshEncryptedToken
          }
        })

        // Set new tokens in cookies
        res.cookie('accessToken', tokens.accessEncryptedToken, {
          httpOnly: true
        })
        res.cookie('refreshToken', tokens.refreshEncryptedToken, {
          httpOnly: true
        })

        return res.status(201).json('Successfully Logged In')
      }
    }

    // If access token is present or no refresh token found
    jwt.verify(
      accessToken,
      process.env.ACCESS_JWT_SECRET as string,
      async (err: VerifyErrors | null) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            if (refreshToken) {
              try {
                const refreshTokenData =
                  await generateDecryptedData(refreshToken)
                const user = await prisma.user.findUnique({
                  where: {
                    userId: refreshTokenData.decryptedData
                  }
                })

                if (
                  user?.refreshToken ===
                  refreshTokenData.encryptedData.encryptedKey
                ) {
                  console.log('User verified from refresh token')
                  // Generate new tokens
                  const tokens = await genTokens(user.userId)
                  await prisma.user.update({
                    where: {
                      userId: user.userId
                    },
                    data: {
                      refreshToken: tokens.refreshEncryptedToken
                    }
                  })

                  // Set new tokens in cookies
                  res.cookie('accessToken', tokens.accessEncryptedToken, {
                    httpOnly: true
                  })
                  res.cookie('refreshToken', tokens.refreshEncryptedToken, {
                    httpOnly: true
                  })

                  return res.status(201).json('Successfully Logged In')
                }
              } catch (error) {
                console.error('Error verifying user from refresh token:', error)
              }
            }
            return res.status(401).json({ message: 'Please Login Again' })
          }
        } else {
          const accessTokenData = await generateDecryptedData(accessToken)
          if (accessTokenData.decryptedData) {
            return res.status(200).json({
              message: 'User verified',
              userId: accessTokenData.decryptedData
            })
          }
        }
        return res.status(401).json({ message: 'Please Login Again' })
      }
    )
  } catch (error) {
    console.error('Error verifying user from token:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
