import { ProductSearchByTerm } from '@shared_interfaces/productSearchByTerm.interfaces'
import { useResultStore } from './store'

const setResultsData = (data: ProductSearchByTerm[]) => {
  useResultStore.setState({ resultData: data })
}

const setOriginalData = (data: ProductSearchByTerm[]) => {
  useResultStore.setState({ originalData: data })
}

export default { setResultsData, setOriginalData }
