import { ResultData } from '@interfaces/results.interface'

export interface ResultState {
  resultData: ResultData[]
  setResultData: (data: ResultData[]) => void
  originalData: ResultData[]
  setOriginalData: (data: ResultData[]) => void
}
