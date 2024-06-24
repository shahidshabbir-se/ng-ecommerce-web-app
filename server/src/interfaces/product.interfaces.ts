export interface productData {
  categoryId: number | undefined
  productId: number
}

export interface productVariantFromSearch {
  variantId: number
  variantName: string
  variantImage: string | null
}

export interface productFromSearch {
  categoryId: number
  productName: string
  regPrice: number
  salePrice: number | null
  productVariants: productVariantFromSearch[]
}

export interface ProductDataInput {
  productName: string
  productDescription: string
  productCare: string
  categoryId: number
  regPrice: number
  salePrice: number | null
  brandId: number
  couponId: number | null
  productVariants: productVariant[]
}

export interface coupon {
  couponId: number
  couponCode: string
  discount: number
  products: ProductDataInput[]
  expiryDate: Date
  createdAt: Date
  updatedAt: Date
}

export interface productVariant {
  variantId: number
  productId: number
  variantName: string
  variantImage: string
  images: string[]
  stock: number
  color: string
  size: string[]
}

export interface brand {
  brandId: number
  brandName: string
  brandDescription: string
  brandImage: string
  products: ProductDataInput[]
}
