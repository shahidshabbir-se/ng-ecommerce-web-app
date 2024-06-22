import jwt from 'jsonwebtoken'
import { JWK, JWE } from 'node-jose'

async function generateEncryptedToken(
  JWT_SECRET: string,
  userId: number,
  expiryTime: string | null
) {
  const _publicKey = process.env.PUBLIC_SECRET_KEY as string
  const publicKey = await JWK.asKey(_publicKey, 'pem')
  const buffer = Buffer.from(JSON.stringify(userId))
  const encryptedKey = await JWE.createEncrypt(
    { format: 'compact', contentAlg: 'A256GCM', fields: { alg: 'RSA-OAEP' } },
    publicKey
  )
    .update(buffer)
    .final()

  const options: jwt.SignOptions = {}
  if (expiryTime) {
    options.expiresIn = expiryTime
  }

  const token = jwt.sign({ encryptedKey }, JWT_SECRET as string, options)

  return token
}

export default generateEncryptedToken
