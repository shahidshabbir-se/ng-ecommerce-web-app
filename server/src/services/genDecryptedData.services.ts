import { JWK, JWE } from 'node-jose'
import jwt from 'jsonwebtoken'

async function generateDecryptedData(encryptedToken: string) {
  const encryptedData = (await jwt.decode(encryptedToken)) as {
    encryptedKey: string
    expiryData?: string
  }

  try {
    const keystore = JWK.createKeyStore()
    await keystore.add(
      await JWK.asKey(process.env.PRIVATE_SECRET_KEY as string, 'pem')
    )
    const output = await JWE.createDecrypt(keystore).decrypt(
      encryptedData?.encryptedKey
    )
    const decryptedData = JSON.parse(output.payload.toString())
    return {
      encryptedData,
      decryptedData
    }
  } catch (error) {
    console.error('Error decrypting token:', error)
    throw error
  }
}

export default generateDecryptedData
