import React, { useState } from 'react'
import { Autocomplete, Button, Slider, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

const search = '/src/assets/images/search.png'

const products = [
  { slug: 'a', img: '/src/assets/images/h1.jpg', title: 'test1', price: 100 },
  { slug: 'b', img: '/src/assets/images/h2.jpg', title: 'test2', price: 200 },
  { slug: 'c', img: '/src/assets/images/h3.jpg', title: 'test3', price: 200 },
  { slug: 'd', img: '/src/assets/images/h4.jpg', title: 'test4', price: 300 },
  { slug: 'e', img: '/src/assets/images/h5.jpg', title: 'test5', price: 1000 },
  { slug: 'f', img: '/src/assets/images/h6.jpg', title: 'test6', price: 2000 },
  { slug: 'g', img: '/src/assets/images/h7.jpg', title: 'test7', price: 3500 }
]

const typeOptions = [
  {
    id: 1,
    type: 1,
    title: '1 room'
  },
  {
    id: 2,
    type: 2,
    title: '2 rooms'
  },
  {
    id: 1,
    type: 3,
    title: '3 rooms'
  }
]

const SearchProductMetrics = (params) => {
  const { setProducts } = params
  const [searchCmd, setSearchCmd] = useState({
    title: '',
    type: null,
    price: [0, 10000],
    date: null
  })

  const handleTitleChange = (e) => {
    setSearchCmd({
      ...searchCmd,
      title: e.target.value
    })
  }

  const handleTypeChange = (e, value, reason) => {
    if (reason == 'clear') {
      setSearchCmd({
        ...searchCmd,
        type: null
      })
      return
    }
    setSearchCmd({
      ...searchCmd,
      type: value.type
    })
  }

  const handlePriceChange = (e, value) => {
    setSearchCmd({
      ...searchCmd,
      price: [value[0], value[1]]
    })
  }

  const handleDateChange = (e, value) => {
    setSearchCmd({
      ...searchCmd,
      date: value
    })
  }

  const getData = () => {
    setProducts(products)
  }

  return (
    <div className="flex flex-col gap-10">
      <h1 className="capitalize text-3xl">shop the latest</h1>
      <div className="flex border-b pb-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none"
          onChange={handleTitleChange}
        />
        <img src={search} alt="search" className="w-6 h-6" />
      </div>
      <Autocomplete
        options={typeOptions}
        autoHighlight
        getOptionLabel={(option) => option.title}
        onChange={handleTypeChange}
        renderInput={(params) => <TextField {...params} label="Room type" />}
      />
      <Slider
        min={0}
        max={10000}
        getAriaLabel={() => 'Minimum distance shift'}
        value={searchCmd.price}
        onChange={handlePriceChange}
        valueLabelDisplay="off"
        disableSwap
        sx={{color: 'black'}}
      />
      <p className="capitalize">
        price: ${searchCmd.price[0]} - ${searchCmd.price[1]}
      </p>
      <DatePicker label="Choose date" onChange={handleDateChange} />
      <Button onClick={getData} sx={{border: '1px solid black', color: 'black'}}>filter</Button>
    </div>
  )
}

export default SearchProductMetrics
