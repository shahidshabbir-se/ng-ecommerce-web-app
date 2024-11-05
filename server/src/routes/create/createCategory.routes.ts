import { prisma } from '@configs/prisma.config'
import { Request, Response } from 'express'
import { categoryData } from '@interfaces/category.interfaces'

export async function createCategory(
  req: Request,
  res: Response
): Promise<void> {
  const { name, description, parentId } = req.body

  const requiredFields: categoryData = {
    categoryName: name,
    categoryDescription: description,
    parentId: parentId
  }

  try {
    if (!requiredFields.categoryName) {
      res.status(400).json({ message: 'Category name is required' })
      return
    }
    const category = await prisma.category.create({
      data: requiredFields
    })

    res.status(201).json(category)
  } catch (error) {
    console.error('Error in createCategory:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
