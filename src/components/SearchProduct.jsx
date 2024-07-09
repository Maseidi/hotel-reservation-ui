import React, { useState } from 'react'
import SearchProductMetrics from './SearchProductMetrics'
import SearchProductResult from './SearchProductResult'

const SearchProduct = () => {
  const [products, setProducts] = useState()

  return (
    <div className="ml-20 flex mr-20 justify-between">
      <SearchProductMetrics setProducts={setProducts} />
      <SearchProductResult products={products} />
    </div>
  )
}

export default SearchProduct
