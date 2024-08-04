export interface GlobalUserState {
  userId: number | null
  firstName: string | null
  lastName: string | null
  email: string | null
  password: string | null
  profileImage: string | null
  cart: any[] | null
  orders: any[] | null
  wishlist: any[] | null
  addresses: any[] | null
  googleId: string | null
}

export interface GlobalUserActions {
  setUser: (user: Partial<GlobalUserState>) => void
  setProfileImage: (imageUrl: string) => void
  updatePassword: (newPassword: string) => void
  addToCart: (item: any) => void
  removeFromCart: (itemId: number) => void
  clearCart: () => void
  addOrder: (order: any) => void
  removeOrder: (orderId: number) => void
  clearOrders: () => void
  addToWishlist: (item: any) => void
  removeFromWishlist: (itemId: number) => void
  clearWishlist: () => void
  addAddress: (address: any) => void
  removeAddress: (addressId: number) => void
  clearAddresses: () => void
  updateGoogleId: (googleId: string) => void
}
