import {create} from 'zustand'
import { ResultState } from './types'

export const useResultStore = create<ResultState>((set) => ({
  resultData: [],
  setResultData: (data) => set({ resultData: data }),
  originalData: [],
  setOriginalData: (data) => set({ originalData: data })
}))
