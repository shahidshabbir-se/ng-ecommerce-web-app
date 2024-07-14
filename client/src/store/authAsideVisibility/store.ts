import { create } from 'zustand'
import { AuthAsideVisibility } from './types'

const authAsideVisibilityStore = create<AuthAsideVisibility>((set) => ({
  authAsideVisibility: false,
  setAuthAsideVisibility: (visibility: boolean) =>
    set({ authAsideVisibility: visibility })
}))

export default authAsideVisibilityStore
