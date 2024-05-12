import { prisma } from '@configs/prisma.config'
import { Request, Response } from 'express'

export async function getCategory(req: Request, res: Response) {
  const { id } = req.params
  try {
    if (!id) {
      return res.status(400).json({ error: 'Missing categoryId' })
    }
    const category = await prisma.category.findFirst({
      where: {
        categoryId:Number(id)
      },
    })
    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }
    return res.status(200).json(category)
  } catch (error) {
    return res.status(500).json({ error: error })
  }
}
