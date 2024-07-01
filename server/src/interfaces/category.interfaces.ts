import { Prisma } from '@prisma/client'

export interface categoryData {
  categoryName: string
  categoryDescription: string
  parentId?: number
}

export interface categorySearch {
  categoryId: number
  categoryName: string
  categoryDescription: Prisma.InputJsonValue
  parentId: number | null
  products: {
    productId: number
    productName: string
    regPrice: number
    salePrice: number | null
    brand: {
      brandName: string
    }
    productVariants: {
      variantId: number
      variantName: string
      images: string[]
      size: string
      color: string
    }[]
  }[]
}
