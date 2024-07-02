import React from 'react'

const Input = (params) => {
  const { label, type, img, placeholder, change, name } = params

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="capitalize text-xs font-bold">
        {label}
      </label>
      <div className="flex flex-row">
        <input
          id={label}
          type={type}
          placeholder={placeholder}
          className="text-xs p-2 rounded-tl-sm rounded-bl-sm focus:outline-[lightblue] outline-8 w-96 border border-fourth"
          onChange={(e) => {
            change(e, name)
          }}
        />
        <figure className="bg-primary w-10 flex justify-center items-center border border-fourth">
          <img src={img} alt={label} className="w-1/3" />
        </figure>
      </div>
    </div>
  )
}

export default Input
