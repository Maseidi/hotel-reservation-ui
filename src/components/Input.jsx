import React, { forwardRef } from 'react'

const inputStyle =
  'text-lg p-3 text-s rounded-lg focus:outline-[lightblue] w-[32rem] bg-fourth text-primary'

const Input = forwardRef(function Input(params, ref) {
  const {
    label,
    value,
    type,
    placeholder,
    change,
    name,
    error,
    rows = 0
  } = params

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="capitalize text-lg font-bold">
        {label}
      </label>
      {rows ? (
        <textarea
          id={label}
          rows={rows}
          placeholder={placeholder}
          value={value}
          ref={ref}
          className={error ? inputStyle + ' border border-red-500' : inputStyle}
          onChange={(e) => change(e, name)}
        />
      ) : (
        <input
          id={label}
          type={type}
          placeholder={placeholder}
          value={value}
          ref={ref}
          className={error ? inputStyle + ' border border-red-500' : inputStyle}
          onChange={(e) => change(e, name)}
        />
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
})

export default Input
