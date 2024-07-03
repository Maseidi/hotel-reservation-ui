import React from 'react'

const inputStyle =
  'text-lg p-3 text-s rounded-lg focus:outline-[lightblue] outline-8 w-[30rem] bg-fourth text-primary'

const Input = (params) => {
  const { label, type, placeholder, change, name, error } = params

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="capitalize text-lg font-bold">
        {label}
      </label>
      <div className="flex flex-row">
        <input
          id={label}
          type={type}
          placeholder={placeholder}
          className={error ? inputStyle + ' border border-red-500' : inputStyle}
          onChange={(e) => {
            change(e, name)
          }}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default Input
