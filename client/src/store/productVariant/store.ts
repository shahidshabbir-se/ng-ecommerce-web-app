import {create} from 'zustand'
import { ProductState } from './types'

const useProductsStore = create<ProductState>((set) => ({
  selectedColor: '',
  setSelectedColor: (color: string) => set({ selectedColor: color })
}))

export default useProductsStore
