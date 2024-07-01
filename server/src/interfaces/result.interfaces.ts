export interface ResultData {
  productId: number
  productName: string
  regPrice: number
  salePrice?: number
  categoryId: number
  categoryName: string
  brandName: string
  updatedAt: Date
  discount?: string
  productVariants: {
    variantName: string
    variantId: number
    images: string[]
    size: string[]
  }[]
}
