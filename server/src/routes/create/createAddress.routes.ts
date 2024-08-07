import { Response, Request } from 'express'
import { prisma } from '@configs/prisma.config'

export async function createAddress(req: Request, res: Response) {
  const { userId, addressLine, city, state, postalCode, country } = req.body

  if (!userId || !addressLine || !city || !state || !postalCode || !country) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const user = await prisma.user.findUnique({
    where: { userId }
  })
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  try {
    const address = await prisma.address.create({
      data: {
        userId,
        addressLine,
        city,
        state,
        postalCode,
        country
      }
    })

    return res.json({ message: 'Address created successfully', address })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
