import passport from 'passport'
import { Response, Request, NextFunction } from 'express'
import { generateToken } from '@utils/jwt.util'

export const verifyByCredentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'local',
    (
      err: Error,
      user: {
        email: string
        password: string
        userId: string
      },
      info: { message: string }
    ) => {
      if (err) return next(err)
      if (!user) return res.status(401).json(info)

      if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
        return res.status(500).json({
          message: 'JWT_ACCESS and JWT_REFRESH secrets are not defined'
        })
      }

      const accessToken = generateToken(
        user,
        '1h',
        process.env.JWT_ACCESS_SECRET
      )
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

      return res.json({ message: 'Login successful', user })
    }
  )(req, res, next)
}
