import { prisma } from '@configs/prisma.config'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { generateToken } from '@utils/jwt.util'

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { firstName, lastName, email, password } = req.body
  if (process.env.JWT_ACCESS_SECRET === undefined) {
    res.status(500).json({ message: 'JWT_ACCESS_SECRET is not defined' })
    return
  }
  if (process.env.PEPPER === undefined) {
    res.status(500).json({ message: 'PEPPER is not defined' })
    return
  }
  if (process.env.JWT_REFRESH_SECRET === undefined) {
    res.status(500).json({ message: 'JWT_REFRESH_SECRET is not defined' })
    return
  }
  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (existingUser) {
    console.log('User already exists')
    res.status(201).json({ message: 'User already exists' })
    return
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password + process.env.PEPPER, salt)

  // Create the user in the database
  const newUser = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: hashedPassword,
      profileImage: '',
      salt: salt
    }
  })

  const accesstoken = generateToken(
    { email, userId: newUser.userId },
    '1h',
    process.env.JWT_ACCESS_SECRET
  )
  const refreshtoken = generateToken(
    { email, userId: newUser.userId },
    '7d',
    process.env.JWT_REFRESH_SECRET
  )

  // Send the access token and refresh token as cookies
  res.cookie('accessToken', accesstoken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })
  res.cookie('refreshToken', refreshtoken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })
  const dataToSend = {
    ...newUser,
    ...(await prisma.user.findUnique({
      where: {
        email
      },
      include: {
        cart: true,
        orders: true,
        wishlist: true,
        addresses: true
      }
    }))
  }
  res
    .status(201)
    .json({ message: 'User created successfully', user: dataToSend })
}
