import { Response, Request } from 'express'
import { prisma } from '@configs/prisma.config'

export async function getAdress(req: Request, res: Response): Promise<void> {
  const { userId } = req.query

  if (!userId) {
    res.status(400).json({ message: 'userId is required' })
    return
  }

  try {
    const address = await prisma.address.findMany({
      where: {
        userId: parseInt(userId as string)
      }
    })

    if (!address) {
      res.status(404).json({ message: 'Address not found' })
      return
    }

    res.status(200).json(address)
  } catch (error) {
    console.error('Error in getAdress:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
