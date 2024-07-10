import React from 'react'
import { Link } from 'react-router-dom'

const SearchProductResult = (params) => {
  const { products = [] } = params

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10">
      {products.map((elem, index) => {
        return (
          <Link key={index} to={`/archive/${elem.slug}`} className='hover:bg-[rgba(0,0,0,0.12)] rounded-md pb-5'>
            <div className="flex flex-col gap-2">
              <div className="w-72 h-72">
                <img
                  src={elem.img}
                  alt={elem.title}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
              <h2 className="capitalize font-bold">{elem.title}</h2>
              <p className="text-[#A18A68] font-bold">$ {elem.price}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default SearchProductResult
