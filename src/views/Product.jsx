import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { DatePicker } from '@mui/x-date-pickers'
import { Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Product = () => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [product, setProduct] = useState()
  const [reservation, setReservation] = useState()
  const [errors, setErrors] = useState([])
  const { slug } = useParams('slug')

  useEffect(() => {
    axios
      .get(process.env.URL + '/products/' + slug)
      .then((res) => {
        setProduct(res.data.product)
        setReservation(res.data.reservations)
      })
      .catch((err) => console.log(err))
  }, [])

  const reserve = () => {
    axios
      .post(
        process.env.URL + '/reservations/checkout',
        {
          productId: product._id,
          startDate,
          endDate
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      )
      .then((res) => {
        document.location.href = res.data.link
      })
      .catch((err) => {
        if (err.response.status != 419) {
          console.log(err)
          return
        }
        let errorMap = {}
        err.response.data.errors.forEach((elem) => {
          errorMap[elem.path] = elem.msg
        })
        console.log(errorMap)
        setErrors(errorMap)
      })
  }

  return (
    <>
      <Header />
      <div className="flex gap-10 mx-20">
        <img
          src={product?.imageUrl?.replace('public', process.env.Domain)}
          alt={product?.title}
          className="w-[35rem] rounded-xl"
        />
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-5xl uppercase">{product?.title}</h1>
          <p className="text-[#A18A68] font-bold text-2xl">
            $ {product?.price}
          </p>
          <p className="text-[#707070] font-bold">{product?.kind}</p>
          <p>{product?.description}</p>
          <h1 className="capitalize">choose date:</h1>
          <div className="flex gap-10">
            <div className="flex flex-col">
              <DatePicker
                label="from"
                onChange={(value) => {
                  setStartDate(new Date(value.$d).getTime())
                }}
                sx={{
                  width: '19rem'
                }}
              />
              {errors['startDate'] && (
                <span className="text-red-500">
                  Start date must not be empty
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <DatePicker
                label="due"
                onChange={(value) => {
                  setEndDate(new Date(value.$d).getTime())
                }}
                sx={{
                  width: '19rem'
                }}
              />
              {errors['endDate'] && (
                <span className="text-red-500">End date must not be empty</span>
              )}
            </div>
          </div>
          <Button
            disabled={reservation}
            onClick={reserve}
            sx={{ width: '19rem', color: 'black', border: '1px solid black' }}
          >
            reserve{' '}
          </Button>
        </div>
      </div>
      {reservation && (
        <div className="bg-black text-white fixed left-10 bottom-10 uppercase">
          <span>you already have reserved this room</span>
        </div>
      )}
    </>
  )
}

export default Product
