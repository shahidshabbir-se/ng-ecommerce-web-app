import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { prisma } from './prisma.config' // Ensure the path is correct
import bcrypt from 'bcrypt'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

if (
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET ||
  !process.env.PEPPER
) {
  throw new Error('Missing required environment variables')
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email
          },
          include: {
            cart: true,
            orders: true,
            wishlist: true,
            addresses: true
          }
        })

        if (!user) {
          return done(null, false, {
            message:
              'This email is not registered. Please sign up to create an account.'
          })
        }

        const combinedPassword = await bcrypt.hash(
          password + process.env.PEPPER,
          user.salt
        )

        if (combinedPassword !== user.password) {
          return done(null, false, {
            message:
              "Incorrect password. Please ensure you've entered the correct password."
          })
        }
        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  )
)

interface UserUpdateData {
  profileImage?: string
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userEmail = profile.emails ? profile.emails[0].value : ''
        if (!userEmail) {
          return done(new Error('No email found in Google profile'), false)
        }

        const user = await prisma.user.findUnique({
          where: {
            email: userEmail
          }
        })

        if (!user) {
          const salt = await bcrypt.genSalt(10)
          const hashedGoogleID = await bcrypt.hash(
            profile.id + process.env.PEPPER,
            salt
          )

          await prisma.user.create({
            data: {
              email: userEmail,
              firstName:
                profile.name?.givenName || 'Please update your first name',
              lastName:
                profile.name?.familyName || 'Please update your last name',
              googleId: hashedGoogleID,
              profileImage: profile.photos
                ? profile.photos[0]?.value
                : 'path/to/default-profile-image.jpg',
              salt: salt
            }
          })
        } else {
          const updatedData: UserUpdateData = {}
          if (profile.photos) {
            updatedData.profileImage = profile.photos[0]?.value
          }
          if (Object.keys(updatedData).length > 0) {
            await prisma.user.update({
              where: { email: userEmail },
              data: updatedData
            })
          }
        }

        return done(null, user ?? false)
      } catch (error) {
        return done(error)
      }
    }
  )
)

export default passport
