import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { formatDate } from '../../util/helper'
import Loading from './Loading'
import Reservations from './Reservations'

const ProductDetails = () => {
  const { id } = useParams('id')
  const [product, setProduct] = useState({})
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get(process.env.URL + `/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        setProduct(res.data.product)
        setReservations(res.data.reservations)
      })
      .catch((err) => {
        setProduct({
          title: 'test',
          slug: 'test',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit recusandae officia totam aliquam eius! Possimus repudiandae expedita, eligendi quaerat quidem ipsa illum impedit, voluptatum fugit fugiat, quae quam reprehenderit reiciendis!',
          price: 1000,
          code: Math.floor(Math.random() * 100000),
          createdAt: Date.now() - 10000000000,
          updatedAt: Date.now()
        })
        setReservations([
          {
            price: 1,
            trackId: 1,
            status: 'nice',
            date: {
              startDate: Date.now() - 10000000000,
              endDate: Date.now() + 10000000000
            },
            updatedAt: Date.now(),
            createdAt: Date.now() - 20000000000
          }
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {loading && <Loading />}
      <div className="m-10 flex gap-10">
        <div className="flex flex-col gap-8">
          <h1 className="capitalize text-3xl font-bold">product details</h1>
          <div className="grid grid-cols-2 h-max justify-between w-[50rem] gap-8">
            <span className="capitalize font-bold">title</span>
            <span>{product.title}</span>
            <span className="capitalize font-bold">slug</span>
            <span>{product.slug}</span>
            <span className="capitalize font-bold">description</span>
            <span className="w-[40ch]">{product.description}</span>
            <span className="capitalize font-bold">price</span>
            <span>{product.price}$</span>
            <span className="capitalize font-bold">code</span>
            <span>{product.code}</span>
            <span className="capitalize font-bold">created</span>
            <span>{formatDate(product.createdAt)}</span>
            <span className="capitalize font-bold">last modified</span>
            <span>{formatDate(product.updatedAt)}</span>
          </div>
          <Reservations reservations={reservations} type='products'/>
        </div>
        <div className="w-96">
          <img
            src={product?.imageUrl?.replace('public', process.env.Domain)}
            alt={product.title}
            className="w-full"
          />
        </div>
      </div>
    </>
  )
}

export default ProductDetails
