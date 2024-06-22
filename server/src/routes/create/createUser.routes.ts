import { prisma } from '@configs/prisma.config'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import genTokens from '@auth/genTokens.middlewares'

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password + process.env.PEPPER, salt)

  // Create the user in the database
  const newUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      salt,
    }
  })

  // Generate tokens
  const tokens = await genTokens(newUser.userId)

  // Store the refresh token in the database
  await prisma.user.update({
    where: {
      userId: newUser.userId
    },
    data: {
      refreshToken: tokens.refreshEncryptedToken
    }
  })

  // Set both tokens in cookies
  res.cookie('accessToken', tokens.accessEncryptedToken, { httpOnly: true })
  res.cookie('refreshToken', tokens.refreshEncryptedToken, { httpOnly: true })

  // Return the newly created user
  return res.status(201).json(newUser)
}
