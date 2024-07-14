import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { prisma } from './prisma.config'
import bcrypt from 'bcrypt'

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    async function (email, password, done) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email
          }
        })
        if (!user) {
          return done(null, false, {
            message:
              'This email is not registered. Please sign up to create an account.'
          })
        }
        const combinedPassword = (await bcrypt.hash(
          password + process.env.PEPPER,
          user.salt
        )) as unknown as string
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

export default passport
