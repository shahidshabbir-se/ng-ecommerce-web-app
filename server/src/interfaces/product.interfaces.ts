export interface productData {
  categoryId: number
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

/*
    categories
        categoryId:Int
        categoryName:string
        categoryDescription:string
        parentId?:string
        children?:categoryId[]
        products:productId[]
        createdAt: Date
        updatedAt: Date

    brands
        brandId: Int
        brandName: string
        brandDescription: string
        brandImage?: string
        products: productId[]
        createdAt: Date
        updatedAt: Date

    productVariants
        variantId: string
        productId: string
        variantName: string
        variantImage?: string
        regPrice: number
        salePrice?: number
        stock: number
        attributes: {
            color: string
            size: string
            colorHex: string
    }

    reviews
        reviewId: string
        productId: string
        userId: string
        rating: number
        comment: string
        createdAt: Date

    products
        productId: string
        productName: string
        productDescription: JSON
        categoryId: string
        brandId: string
        images: string[]
        productVariants: productVariant[]
        reviews: review[]
        averageRating: number
        soldCount: number
        featured: boolean
        createdAt: Date
        updatedAt: Date

    addresses
        addressId: string
        userId: string
        addressLine: string
        city: string
        state: string
        postalCode: string
        country: string
        createdAt: Date
        updatedAt: Date

    orders:
        orderId: string
        userId: string
        products: productId[]
        orderTotal: number
        orderStatus: string
        shippingAddress: addressId
        createdAt: Date
        updatedAt: Date

    users:
        userId: string
        firstName: string
        lastName: string
        email: string
        password: string
        role: string
        addresses: addressId[]
        orders: orderId[]
        salt: string
        profileImage?: string
        createdAt: Date
        updatedAt: Date

    carts:
        cartId: string
        userId: string
        products: productId[]
        createdAt: Date
        updatedAt: Date

    wishlists:
        wishlistId: string
        userId: string
        products: productId[]
        createdAt: Date
        updatedAt: Date

    coupons:
        couponId: string
        couponCode: string
        discount: number
        products: productId[]
        expiryDate: Date
        createdAt: Date
        updatedAt: Date

*/
