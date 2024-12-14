<<<<<<< HEAD
import { useResultStore } from './store'
import { ResultData } from '@interfaces/results.interface'

const setResultsData = (data: ResultData[]) => {
  useResultStore.setState({ resultData: data })
}

const setOriginalData = (data: ResultData[]) => {
=======
import { ProductSearchByTerm } from '@shared_interfaces/productSearchByTerm.interfaces'
import { useResultStore } from './store'

const setResultsData = (data: ProductSearchByTerm[]) => {
  useResultStore.setState({ resultData: data })
}

const setOriginalData = (data: ProductSearchByTerm[]) => {
>>>>>>> result_page
  useResultStore.setState({ originalData: data })
}

export default { setResultsData, setOriginalData }
