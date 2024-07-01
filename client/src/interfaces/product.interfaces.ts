export interface productData {
  productId: number
  productName: string
  productDescription: string
  // productVariants?:
  brand: {
    brandName: string
    brandImage?: string
  }
  categoryId: number
  regPrice: number
  salePrice: number
  productVariants: {
    variantId: number
    variantName: string
    variantImage: string
    images: string[]
  }[]
}
