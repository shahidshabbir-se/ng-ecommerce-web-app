import { prisma } from '@configs/prisma.config'
import { Request, Response } from 'express'

export async function createBrand(req: Request, res: Response): Promise<void> {
  try {
    const { brandName, brandDescription, brandImage } = req.body

    // Validate required fields
    if (!brandName) {
      res.status(400).json({ message: 'Brand name is required' })
      return
    }

    // Create the brand
    const brand = await prisma.brand.create({
      data: {
        brandName,
        brandDescription,
        brandImage,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    res.status(201).json({ message: 'Brand created', brand })
  } catch (error) {
    console.error('Error creating brand:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
