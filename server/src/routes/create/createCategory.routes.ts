import { prisma } from '@configs/prisma.config'
import { Request, Response } from 'express'
import { categoryData } from '@interfaces/category.interfaces'

export async function createCategory(req: Request, res: Response) {
  const { name, description, parentId } = req.body

  const requiredFields: categoryData = {
    categoryName: name,
    categoryDescription: description,
    parentId: parentId
  }

  try {
    if (!requiredFields.categoryName) {
      return res.status(400).json({ message: 'Category name is required' })
    }
    const category = await prisma.category.create({
      data: requiredFields
    })

    return res.status(201).json(category)
  } catch (error) {
    console.error('Error in createCategory:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
