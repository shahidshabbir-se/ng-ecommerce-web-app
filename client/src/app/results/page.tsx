// Page.tsx
import React from 'react'
import Results from './results'
import LoadingFilters from './loadingFilters'
import LoadingProducts from './loadingProducts'

const Page = () => {
  return (
    <div>
      <Results
        loadingFilters={<LoadingFilters />}
        loadingProducts={<LoadingProducts />}
      />
    </div>
  )
}

export default Page
