import React from 'react'

const inputStyle =
  'text-lg p-3 text-s rounded-lg focus:outline-[lightblue] w-[32rem] bg-fourth text-primary capitalize'

const Select = (params) => {
  const { label, value, change, name, error, values, options } = params

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="capitalize text-lg font-bold">
        {label}
      </label>
      <select
        value={value}
        onChange={() => change(e, name)}
        className={error ? inputStyle + ' border border-red-500' : inputStyle}
      >
        {values.map((elem, index) => {
          return <option value={elem}>{options[index]}</option>
        })}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default Select
