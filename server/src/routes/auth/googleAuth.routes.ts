import { Response, Request } from 'express'
import { generateToken } from '@utils/jwt.util'

export async function handleGoogleAuthCallback(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const user = req.user as { email: string; userId: string }
    if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
      res.status(500).json({
        message: 'JWT_ACCESS and JWT_REFRESH secrets are not defined'
      })
      return
    }
    const accessToken = generateToken(user, '1h', process.env.JWT_ACCESS_SECRET)

    const refreshToken = generateToken(
      user,
      '7d',
      process.env.JWT_REFRESH_SECRET
    )

    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })

    // Redirect the user to the frontend with the JWT token
    res.redirect(`${process.env.CLIENT_URL}/`)
  } catch (error) {
    console.error('Error creating or updating user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
