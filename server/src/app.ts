import express from 'express'
import dotenv from 'dotenv'
import setupModuleAliases from './moduleAlias'
import cookieParser from 'cookie-parser'
setupModuleAliases()
import { connectDB } from '@configs/prisma.config'
import cors from 'cors'
import passport from '@configs/passport.config'
dotenv.config()

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())

app.use(cors(corsOptions))

import router from '@routes/export.routes'

app.use('/api', router)

app.get('/', (req: express.Request, res: express.Response) => {
  res.send(`<h3>App is running at port ${process.env.PORT}</h3>`)
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
  connectDB()
})

// import { JWK, JWE } from 'node-jose'
// import jwt from 'jsonwebtoken'

// const encrypt = async (
//   raw: unknown,
//   contentAlg = 'A256GCM',
//   alg = 'RSA-OAEP'
// ) => {
//   const _publicKey = `-----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCWRpHIxzmE5pdmZiDKmC3FJWj8
// eoTD3gbhHV7s1zIN6wtmMmKR6rToH6tY+cOD+ogoapsoIXpaPnnhh8E3j4XIcyTY
// vb+pROD73RASP1Id/wNTHZug3wvpcibLx3cpa7s0pWsOtuxacFyC5XppNPzTVbZe
// AZ1ceG7NVbFI/lb5GQIDAQAB
// -----END PUBLIC KEY-----`
//   const publicKey = await JWK.asKey(_publicKey, 'pem')
//   const buffer = Buffer.from(JSON.stringify(raw))
//   const encrypted = await JWE.createEncrypt(
//     { format: 'compact', contentAlg: contentAlg, fields: { alg: alg } },
//     publicKey
//   )
//     .update(buffer)
//     .final()
//   return encrypted
// }

// const decrypt = async (encryptedBody: string) => {
//   const _privateKey = `-----BEGIN RSA PRIVATE KEY-----
// MIICXAIBAAKBgQCWRpHIxzmE5pdmZiDKmC3FJWj8eoTD3gbhHV7s1zIN6wtmMmKR
// 6rToH6tY+cOD+ogoapsoIXpaPnnhh8E3j4XIcyTYvb+pROD73RASP1Id/wNTHZug
// 3wvpcibLx3cpa7s0pWsOtuxacFyC5XppNPzTVbZeAZ1ceG7NVbFI/lb5GQIDAQAB
// AoGAMS9Dw91A/Dik0QUYMncAdAg8hnZrQdhHlCKS0R3V6ixF/Nr83BlfwKGs6WBG
// F8pGCkRqKAZdD3BnX+OY3+B/vo1Zr3iJFUkDHSLV4UzDXgLvUV7fo9Ys0VwGbhHw
// SBcrBt+yju4wBgJdoEY3bo8QgPbELszVideDq83KTLksowkCQQDGxs6qFZP2pyT6
// Rp6F21XzufpDUlbXpn3gqvNKtatTibMZRhuclEJFEo+Jy5K4EHO/+cSqazTcTq7T
// CLZPtWnfAkEAwYlmfyp0kUU/SqF+MgtoRrSi/Svfnvu7VHnW6FTQhbeOc8GrRVJW
// 6tJhfmSF3/gLkrcpc8mZMSwV/tOCDSlsBwJBALENB6tLiP2bpz4dhLlpwkdTEezA
// /IUc0OY6nnWfFzlTX2lVnuZ60ARCIgP0hXzZeqA2UswQrYbFtsZV7j1VMzUCQB43
// TYFdJ4XmwdLtE77MeSNQ4IGWb/tqYfz2aM8tLsExv1PjUNIp4NgYsJADMcOd/nCR
// mC8zsm8y6tw2OX/Ej9ECQDrAYbyPxmg7n5tMQNUKZoOqerl4TD9/K3SrICir4cnQ
// nqmSV8XPyrMctJB81VLlsu870u+03EyifmGqHHMnHsk=
// -----END RSA PRIVATE KEY-----`
//   const keystore = JWK.createKeyStore()
//   await keystore.add(await JWK.asKey(_privateKey, 'pem'))
//   const output = await JWE.createDecrypt(keystore).decrypt(encryptedBody)
//   const claims = JSON.parse(output.payload.toString())
//   return claims
// }

// ;(async () => {
//   const raw = jwt.sign({ userId: 49 }, process.env.JWT_SECRET as string)

//   const encryptedData = await encrypt(raw)
//   console.log(encryptedData)
//   const decryptedData = await decrypt(encryptedData)
//   console.log(decryptedData)
//   const decodedData = jwt.decode(decryptedData)
//   console.log('Decoded Data:', decodedData)
// })()
