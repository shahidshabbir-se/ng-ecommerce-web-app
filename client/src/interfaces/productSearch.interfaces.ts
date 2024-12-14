export interface productSearchByTerm {
  productId: number
  productName: string
  productDescription: string
  categoryId: number
  regPrice: number
  salePrice: number
  brand: {
    brnadId: number
    brandName: string
  }
  productVariants: {
    variantId: number
    variantName: string
    images: string[]
  }[]
}
