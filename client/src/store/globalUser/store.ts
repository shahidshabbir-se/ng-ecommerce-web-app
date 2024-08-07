import { create } from 'zustand'
import { GlobalUserState, GlobalUserActions } from './types'
import { actions } from './actions'

export const useGlobalUserStore = create<GlobalUserState & GlobalUserActions>(
  (set) => ({
    userId: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    profileImage: null,
    cart: [],
    orders: [],
    wishlist: [],
    addresses: [],
    googleId: null,
    ...actions(set)
  })
)
