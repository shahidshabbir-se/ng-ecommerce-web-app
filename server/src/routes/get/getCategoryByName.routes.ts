import { prisma } from '@configs/prisma.config'
import { Request, Response } from 'express'

export async function getCategoryByName(req: Request, res: Response) {
  const { term } = req.query

  try {
    if (!term) {
      res.status(400).json({ message: 'Term is required' })
      return
    }

    // Fetch the category by name and include its parent
    const category = await prisma.category.findUnique({
      where: {
        categoryName: term.toString()
      },
      include: {
        parent: true
      }
    })

    if (!category) {
      res.status(404).json({ message: 'Category not found' })
      return
    }

    res.status(200).json(category)
  } catch (error) {
    console.error('Error in getProductByTerm:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
