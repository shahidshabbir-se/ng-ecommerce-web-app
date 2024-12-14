<<<<<<< HEAD
import { ResultData } from '@interfaces/results.interface'

export interface ResultState {
  resultData: ResultData[]
  setResultData: (data: ResultData[]) => void
  originalData: ResultData[]
  setOriginalData: (data: ResultData[]) => void
=======
import { ProductSearchByTerm } from '@shared_interfaces/productSearchByTerm.interfaces'

export interface ResultState {
  resultData: ProductSearchByTerm[]
  setResultData: (data: ProductSearchByTerm[]) => void
  originalData: ProductSearchByTerm[]
  setOriginalData: (data: ProductSearchByTerm[]) => void
>>>>>>> result_page
}
