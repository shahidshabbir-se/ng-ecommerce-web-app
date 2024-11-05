import { Request, Response } from 'express'
import { prisma } from '@configs/prisma.config'
import { verifyToken } from '@utils/jwt.util'
import dotenv from 'dotenv'

dotenv.config()

export const verifyByTokens = async (
  req: Request,
  res: Response
): Promise<void> => {
  const accessToken = req.headers['accesstoken'] as string

  if (!accessToken) {
    res
      .status(401)
      .json({ message: 'Access token is required for authentication.' })
    return
  }

  if (!process.env.JWT_ACCESS_SECRET) {
    res.status(500).json({
      message: 'Server configuration error: JWT secret is not defined.'
    })
    return
  }

  try {
    const decodedToken = verifyToken(accessToken, process.env.JWT_ACCESS_SECRET)
    const email = decodedToken.email

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        cart: true,
        orders: true,
        wishlist: true,
        addresses: true
      }
    })

    if (!user) {
      res
        .status(404)
        .json({ message: 'No user associated with this token was found.' })
      return
    }

    res.status(200).json({ message: 'User verified successfully.', user })
  } catch (error) {
    console.error('Error during token verification:', error)
    res
      .status(401)
      .json({ message: 'The access token provided is invalid or expired.' })
  }
}
