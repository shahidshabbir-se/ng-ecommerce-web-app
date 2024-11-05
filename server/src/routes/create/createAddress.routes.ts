import { Response, Request } from 'express'
import { prisma } from '@configs/prisma.config'

export async function createAddress(
  req: Request,
  res: Response
): Promise<void> {
  const { userId, addressLine, city, state, postalCode, country } = req.body

  if (!userId || !addressLine || !city || !state || !postalCode || !country) {
    res.status(400).json({ message: 'Missing required fields' })
    return
  }

  const user = await prisma.user.findUnique({
    where: { userId }
  })
  if (!user) {
    res.status(404).json({ message: 'User not found' })
    return
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

    res.json({ message: 'Address created successfully', address })
  } catch (error) {
    console.error('Error in creating address:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
