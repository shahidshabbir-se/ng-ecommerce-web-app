import { Request, Response } from 'express'
import { prisma } from '@configs/prisma.config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const login = async (req: Request, res: Response) => {
  const generateToken = (userId: string, email: string) => {
    return jwt.sign(
      { id: userId, email: email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' } // example expiration time
    )
  }

  const { email, password } = req.body
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' })
  }

  const token = generateToken(user.id, user.email)

  return res.status(200).json({ user, token })
}
