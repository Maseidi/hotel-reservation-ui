import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const right = '/src/assets/images/right.png'
const bottom = '/src/assets/images/bottom.png'

const OptionGroup = (params) => {

    const { heading, options, urls } = params

    const [open, setOpen] = useState(false)

  return <div className='flex flex-col gap-4'>
    <div className='flex justify-between cursor-pointer select-none' onClick={() => setOpen(!open)}>
        <h1 className='capitalize'>{heading}</h1>
        {open ? <img src={bottom} alt='open' className='w-7'/> : <img src={right} alt='close' className='w-7'/>}
    </div>
    {
        open && options.map((elem, index) => {
            return <Link className='ml-4 capitalize' key={index} to={urls[index]}>{elem}</Link>
        })
    }
  </div>
}

export default OptionGroup
