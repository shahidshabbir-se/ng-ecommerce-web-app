export interface Order {
  userId: number
  addressId: number
  totalAmount: number
  products: OrderItem[]
}

export interface OrderItem {
  productId: number
  variantId: number
  size: string
  quantity: number
}
