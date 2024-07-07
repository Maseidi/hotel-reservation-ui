import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
  const { id } = useParams('id')

  const [product, setProduct] = useState({})

  useEffect(() => {
    axios
      .get(process.env.URL + `/admin/products/${id}`, {
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="m-10 flex flex-col gap-8">
      <h1 className="capitalize text-3xl font-bold">product details</h1>
      <div className="grid grid-cols-2 h-max justify-between w-[50rem] gap-8">
        <span className="capitalize font-bold">title</span>
        <span>{product.title}</span>
        <span className="capitalize font-bold">slug</span>
        <span>{product.slug}</span>
        <span className="capitalize font-bold">description</span>
        <span>{product.description}</span>
        <span className="capitalize font-bold">price</span>
        <span>{product.price}</span>
        <span className="capitalize font-bold">code</span>
        <span>{product.code}</span>
        <span className="capitalize font-bold">created</span>
        <span>{product.createdAt}</span>
        <span className="capitalize font-bold">last modified</span>
        <span>{product.updatedAt}</span>
      </div>
    </div>
  )
}

export default ProductDetails
