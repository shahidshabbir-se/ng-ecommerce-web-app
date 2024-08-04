import jwt from 'jsonwebtoken'
interface User {
  userId: string | number
  email: string
}

export function generateToken(
  user: User,
  expiryTime: string = '1h',
  JWT_SECRET: string
): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }

  const payload = { userId: user.userId, email: user.email }
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: expiryTime
  })
}

export function verifyToken(token: string, JWT_SECRET: string): User {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }

  return jwt.verify(token, JWT_SECRET) as User
}
