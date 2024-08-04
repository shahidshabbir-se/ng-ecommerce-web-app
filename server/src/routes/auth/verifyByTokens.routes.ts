import { Request, Response } from 'express'
import { prisma } from '@configs/prisma.config'
import { verifyToken } from '@utils/jwt.util'
import dotenv from 'dotenv'

dotenv.config()

export const verifyByTokens = async (req: Request, res: Response) => {
  // Retrieve access token from headers
  const accessToken = req.headers['accesstoken'] as string
  console.log('headers:', req.headers)

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token is required' })
  }

  if (!process.env.JWT_ACCESS_SECRET) {
    return res.status(500).json({ message: 'JWT_ACCESS_SECRET is not defined' })
  }

  try {
    // Decrypt and verify the token
    const decodedToken = verifyToken(accessToken, process.env.JWT_ACCESS_SECRET)
    const email = decodedToken.email
    const user = await prisma.user.findUnique({
      where: { email },
      // send email, name, and id
      include: {
        cart: true,
        orders: true,
        wishlist: true,
        addresses: true
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json(user)
  } catch (error) {
    // console.error('Error verifying token:', error.message); // Log the error for debugging
    return res.status(401).json({ message: 'Invalid access token' })
  }
}
