import { useResultStore } from './store'
import { ResultData } from '@interfaces/results.interface'

const setResultsData = (data: ResultData[]) => {
  useResultStore.setState({ resultData: data })
}

const setOriginalData = (data: ResultData[]) => {
  useResultStore.setState({ originalData: data })
}

export default { setResultsData, setOriginalData }
