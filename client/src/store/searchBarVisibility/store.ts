import { create } from 'zustand'
import { SearchVisibilityState } from './types'

const useSearchVisibilityStore = create<SearchVisibilityState>((set) => ({
  searchBarVisibility: false,
  setSearchBarVisibility: (visibility: boolean) =>
    set({ searchBarVisibility: visibility })
}))

export default useSearchVisibilityStore
