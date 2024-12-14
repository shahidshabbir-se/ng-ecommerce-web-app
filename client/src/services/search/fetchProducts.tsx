import { ProductSearchByTerm } from '@shared_interfaces/productSearchByTerm.interfaces'
import { productSearchByTerm } from '@api/search/productSearchByTerm'
import { useResultStore } from '@store/results/store'

export const fetchProducts = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setSelectedImages: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >,
  searchTerm: string,
  startPoint: number
) => {
  try {
    const existingData = useResultStore.getState().resultData
    const originalData = useResultStore.getState().originalData

    if (existingData === undefined) {
      setLoading(true)
    }
    const response = await productSearchByTerm(searchTerm, startPoint)

    // Fetch the existing products in the store

    // Combine the new data with the existing products
    const newOriginalData = originalData
      ? [...originalData, ...response]
      : response
    const newData = [...existingData, ...response]

    // Update the store with the new combined data
    useResultStore.setState({
      resultData: newData,
      originalData: newOriginalData
    })
    console.log(
      useResultStore.getState().resultData.length,
      'result data in fetchProducts'
    )
    console.log(
      useResultStore.getState().originalData.length,
      'original data in fetchProducts'
    )

    // Update the selected images with the new products
    const initialSelectedImages: { [key: string]: string } = {}
    newData.forEach((product: ProductSearchByTerm) => {
      initialSelectedImages[product.productId] =
        product.productVariants[0].images[0]
    })
    setSelectedImages(initialSelectedImages)

    setError(null) // Clear any previous errors if the products are successfully fetched
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message)
    } else {
      setError('Unable to load products at the moment. Please try again later.')
    }
  } finally {
    setLoading(false)
  }
}
