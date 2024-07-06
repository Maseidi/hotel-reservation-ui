import React, { useState } from 'react'
import Input from './Input'

const validAuthSubmit =
  'capitalize bg-submit text-primary rounded-lg p-2 hover:brightness-125 text-lg w-max self-end'
const invalidAuthSubmit =
  'capitalize bg-[gray] text-primary rounded-lg p-2 text-lg w-max self-end'

const SubmitProduct = () => {
  const [storeProductCmd, setStoreProductCmd] = useState({
    title: '',
    price: '',
    description: '',
    slug: ''
  })

  const [errors, setErrors] = useState({})

  const changeValue = (e, name) => {
    setStoreProductCmd({
      ...storeProductCmd,
      [name]: e.target.value
    })
  }

  const storeUser = () => {
    axios
      .post(process.env.URL + '/admin/products', storeProductCmd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => console.log(res))
      .catch((err) => {
        if (err.response.status != 419) {
          console.log(err)
          return
        }
        let errorMap = {}
        err.response.data.errors.forEach((elem) => {
          errorMap[elem.path] = elem.msg
        })
        setErrors(errorMap)
      })
  }

  const anythingEmpty = () =>
    storeProductCmd.title == '' ||
    storeProductCmd.price == '' ||
    storeProductCmd.description == ''

  return (
    <div className="mt-10 ml-10 flex flex-col gap-8">
      <h1 className="capitalize text-3xl font-bold">submit product</h1>
      <div className="rounded-bl-md rounded-tr-md rounded-br-md flex flex-col gap-4 relative">
        <Input
          label={'title'}
          type={'text'}
          placeholder={'title'}
          change={changeValue}
          name={'title'}
          error={errors['title']}
        />
        <Input
          label={'price'}
          type={'number'}
          placeholder={'price'}
          change={changeValue}
          name={'price'}
          error={errors['price']}
        />
        <Input
          label={'description'}
          rows={5}
          placeholder={'description'}
          change={changeValue}
          name={'description'}
          error={errors['description']}
        />
        <Input
          label={'slug (optional)'}
          type={'text'}
          placeholder={'slug'}
          change={changeValue}
          name={'slug'}
          error={errors['slug']}
        />
        {anythingEmpty() ? (
          <button className={invalidAuthSubmit} disabled>
            submit
          </button>
        ) : (
          <button className={validAuthSubmit} onClick={storeUser}>
            submit
          </button>
        )}
      </div>
    </div>
  )
}

export default SubmitProduct
