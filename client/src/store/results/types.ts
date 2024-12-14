import { ProductSearchByTerm } from '@shared_interfaces/productSearchByTerm.interfaces'

export interface ResultState {
  resultData: ProductSearchByTerm[]
  setResultData: (data: ProductSearchByTerm[]) => void
  originalData: ProductSearchByTerm[]
  setOriginalData: (data: ProductSearchByTerm[]) => void
}
