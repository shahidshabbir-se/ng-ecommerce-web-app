import { GlobalUserState, GlobalUserActions } from './types'

export const actions = (set: any) => ({
  setUser: (user: Partial<GlobalUserState>) =>
    set((state: GlobalUserState) => ({ ...state, ...user })),
  setProfileImage: (imageUrl: string) =>
    set((state: GlobalUserState) => ({ ...state, profileImage: imageUrl })),
  updatePassword: (newPassword: string) =>
    set((state: GlobalUserState) => ({ ...state, password: newPassword })),
  addToCart: (item: any) =>
    set((state: GlobalUserState) => ({
      ...state,
      cart: [...(state.cart || []), item]
    })),
  removeFromCart: (itemId: number) =>
    set((state: GlobalUserState) => ({
      ...state,
      cart: (state.cart || []).filter((item) => item.id !== itemId)
    })),
  clearCart: () => set((state: GlobalUserState) => ({ ...state, cart: [] })),
  addOrder: (order: any) =>
    set((state: GlobalUserState) => ({
      ...state,
      orders: [...(state.orders || []), order]
    })),
  removeOrder: (orderId: number) =>
    set((state: GlobalUserState) => ({
      ...state,
      orders: (state.orders || []).filter((order) => order.id !== orderId)
    })),
  clearOrders: () =>
    set((state: GlobalUserState) => ({ ...state, orders: [] })),
  addToWishlist: (item: any) =>
    set((state: GlobalUserState) => ({
      ...state,
      wishlist: [...(state.wishlist || []), item]
    })),
  removeFromWishlist: (itemId: number) =>
    set((state: GlobalUserState) => ({
      ...state,
      wishlist: (state.wishlist || []).filter((item) => item.id !== itemId)
    })),
  clearWishlist: () =>
    set((state: GlobalUserState) => ({ ...state, wishlist: [] })),
  addAddress: (address: any) =>
    set((state: GlobalUserState) => ({
      ...state,
      addresses: [...(state.addresses || []), address]
    })),
  removeAddress: (addressId: number) =>
    set((state: GlobalUserState) => ({
      ...state,
      addresses: (state.addresses || []).filter(
        (address) => address.id !== addressId
      )
    })),
  clearAddresses: () =>
    set((state: GlobalUserState) => ({ ...state, addresses: [] })),
  updateGoogleId: (googleId: string) =>
    set((state: GlobalUserState) => ({ ...state, googleId }))
})
