import React, { useState } from 'react'
import Header from '../components/Header'
import { DatePicker } from '@mui/x-date-pickers'
import { Button } from '@mui/material'
import { formatDate } from '../../util/helper'

const Product = () => {
  const [date, setDate] = useState()

  const reserve = () => {
    console.log('reserving...')
  }

  return (
    <>
      <Header />
      <div className="flex gap-10 mx-20">
        <img
          src={'/src/assets/images/h1.jpg'}
          alt={'h1'}
          className="w-[35rem] rounded-xl"
        />
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-5xl">Hotel 1</h1>
          <p className="text-[#A18A68] font-bold text-2xl">$ 1000</p>
          <p className="text-[#707070] font-bold">3 rooms</p>
          <p className="text-[#707070] font-bold capitalize">
            availabe from {formatDate(Date.now() - 1000000000)} to{' '}
            {formatDate(Date.now() + 1000000000)}
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            doloremque aperiam fugiat, cupiditate velit vitae earum possimus,
            voluptatibus voluptates sequi, eum vel molestias consectetur.
            Deleniti eligendi numquam animi quaerat explicabo.
          </p>
          <DatePicker
            label="Choose date"
            onChange={(e, val) => setDate(val)}
            sx={{ width: '19rem' }}
          />
          <Button
            onClick={reserve}
            sx={{ width: '19rem', color: 'black', border: '1px solid black' }}
          >
            Reserve
          </Button>
        </div>
      </div>
    </>
  )
}

export default Product
