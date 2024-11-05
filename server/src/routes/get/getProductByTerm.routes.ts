import { prisma } from '@configs/prisma.config'
import { productFromSearch } from '@interfaces/product.interfaces'
import { Request, Response } from 'express'

export async function getProductByTerm(
  req: Request,
  res: Response
): Promise<void> {
  const { term, categoryId } = req.query

  try {
    if (!term) {
      res.status(400).json({ message: 'Term is required' })
      return
    }

    let products: productFromSearch[] = []

    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: {
          categoryId: Number(categoryId)
        }
      })

      if (category) {
        products = await prisma.product.findMany({
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

    if (!categoryId || products.length === 0) {
      const additionalProducts = await prisma.product.findMany({
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

      products = products.concat(additionalProducts)
    }

    res.status(200).json(products)
  } catch (error) {
    console.error('Error in getProductByTerm:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
