import { ResultData } from '@interfaces/results.interface'

export function sortProduct(
  data: ResultData[],
  sort: string,
  originalData: ResultData[]
) {
  let sortedData = [...data]
  switch (sort) {
    case 'relevance':
      return [...originalData]
    case 'price-asc':
      return sortedData.sort((a, b) => a.regPrice - b.regPrice)
    case 'price-desc':
      return sortedData.sort((a, b) => b.regPrice - a.regPrice)
    case 'newest':
      return sortedData.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    default:
      return sortedData
  }
}
