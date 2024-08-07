export interface AddToCart {
  userId: number | null
  productId: number | null
  quantity: number | null
  variantId: number | null
  size: string | null
}

export interface CartItem {
  productId: number
  quantity: number
  product: {
    id: number
    name: string
    color: string
    salePrice: number
    regPrice: number
    imageUrl: string
    size: string
    quantity: number
    variantId: number
  }
}
