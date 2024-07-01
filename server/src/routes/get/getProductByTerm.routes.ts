import { prisma } from '@configs/prisma.config'
import { productFromSearch } from '@interfaces/product.interfaces'
import { Request, Response } from 'express'

export async function getProductByTerm(req: Request, res: Response) {
  const { term, categoryId } = req.query

  try {
    if (!term) {
      return res.status(400).json({ message: 'Term is required' })
    }

    let productsFromCategory: productFromSearch[] = []
    let productsFromDatabase: productFromSearch[] = []

    if (categoryId) {
      // Search within the specified category first
      const category = await prisma.category.findUnique({
        where: {
          categoryId: Number(categoryId)
        }
      })

      if (category) {
        productsFromCategory = await prisma.product.findMany({
          where: {
            categoryId: Number(categoryId),
            OR: [
              {
                productName: {
                  contains: term.toString(),
                  mode: 'insensitive'
                }
              }
            ]
          },
          select: {
            productId: true,
            productName: true,
            categoryId: true,
            regPrice: true,
            salePrice: true,
            productVariants: {
              select: {
                variantId: true,
                variantName: true,
                images: true
              }
            }
          }
        })
      }
    }

    // Search across the entire product database if categoryId is missing or not valid
    if (!categoryId || productsFromCategory.length === 0) {
      productsFromDatabase=await prisma.product.findMany({
        where: {
          OR: [
            {
              productName: {
                contains: term.toString(),
                mode: 'insensitive'
              }
            }
          ]
        },
        select: {
          productId: true,
          productName: true,
          categoryId: true,
          regPrice: true,
          salePrice: true,
          productVariants: {
            select: {
              variantId: true,
              variantName: true,
              images: true
            }
          }
        }
      })
    }

    // Concatenate and sort the results
    const sortedProducts = [...productsFromCategory, ...productsFromDatabase]

    return res.status(200).json(sortedProducts)
  } catch (error) {
    console.error('Error in getProductByTerm:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
