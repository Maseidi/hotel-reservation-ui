import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, Slider, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import axios from 'axios'

const search = '/src/assets/images/search.png'

const typeOptions = [
  {
    id: 1,
    title: '1 room'
  },
  {
    id: 2,
    title: '2 room'
  },
  {
    id: 1,
    title: '3 room'
  }
]

const SearchProductMetrics = (params) => {
  const { setProducts } = params
  const [searchCmd, setSearchCmd] = useState({
    title: '',
    kind: '',
    price: {
      startPrice: 0,
      endPrice: 10000
    },
    date: {
      startDate: 0,
      endDate: Date.now()
    }
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
        kind: ''
      })
      return
    }
    setSearchCmd({
      ...searchCmd,
      kind: value.title
    })
  }

  const handlePriceChange = (e, value) => {
    setSearchCmd({
      ...searchCmd,
      price: {
        startPrice: value[0],
        endPrice: value[1]
      }
    })
  }

  const handleStartDateChange = (value) => {
    setSearchCmd({
      ...searchCmd,
      date: {
        ...searchCmd.date,
        startDate: new Date(value.$d).getTime()
      }
    })
  }

  const handleEndDateChange = (value) => {
    setSearchCmd({
      ...searchCmd,
      date: {
        ...searchCmd.date,
        endDate: new Date(value.$d).getTime()
      }
    })
  }

  const getData = () => {
    axios
      .post(process.env.URL + '/products/search', searchCmd)
      .then((res) => {
        setProducts(res.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="flex flex-col gap-10 pb-8">
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
        value={[searchCmd.price.startPrice, searchCmd.price.endPrice]}
        onChange={handlePriceChange}
        valueLabelDisplay="off"
        disableSwap
        sx={{ color: 'black' }}
      />
      <p className="capitalize">
        price: ${searchCmd.price.startPrice} - ${searchCmd.price.endPrice}
      </p>
      <DatePicker label="From" onChange={handleStartDateChange} />
      <DatePicker label="Due" onChange={handleEndDateChange} />
      <Button
        onClick={getData}
        sx={{ border: '1px solid black', color: 'black' }}
      >
        filter
      </Button>
    </div>
  )
}

export default SearchProductMetrics
