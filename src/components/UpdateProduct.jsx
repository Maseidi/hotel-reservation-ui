import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Input from './Input'
import axios from 'axios'
import Loading from './Loading'
import { INVALID_BTN, VALID_BTN } from '../../util/constant'

const UpdateProduct = () => {
  const { id } = useParams('id')
  const [updateProductCmd, setUpdateProductCmd] = useState({})
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const changeValue = (e, name) => {
    if (name == 'price') if (e.target.value < 0) return
    setUpdateProductCmd({
      ...updateProductCmd,
      [name]: e.target.value
    })
  }

  useEffect(() => {
    setLoading(true)
    axios
      .get(process.env.URL + `/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) =>
        setUpdateProductCmd({
          title: res.data.title,
          slug: res.data.slug,
          description: res.data.description,
          price: res.data.price
        })
      )
      .catch((err) =>
        setUpdateProductCmd({
          title: 'test',
          slug: 'test',
          description: 'test',
          price: 10
        })
      )
      .finally(() => setLoading(false))
  }, [])

  const updateProduct = () => {
    setLoading(true)
    axios
      .put(process.env.URL + `/admin/products/${id}`, updateProductCmd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => setErrors({}))
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
      .finally(() => setLoading(false))
  }

  const anythingEmpty = () =>
    updateProductCmd.name == '' ||
    updateProductCmd.email == '' ||
    updateProductCmd.password == '' ||
    updateProductCmd.password_confirmation == ''

  return (
    <>
      {loading && <Loading />}
      <div className="m-10 flex flex-col gap-8">
        <h1 className="capitalize text-3xl font-bold">update product</h1>
        <div className="rounded-bl-md rounded-tr-md rounded-br-md flex flex-col gap-4 relative">
          <Input
            label={'title'}
            value={updateProductCmd.title}
            type={'text'}
            placeholder={'title'}
            change={changeValue}
            name={'title'}
            error={errors['title']}
          />
          <Input
            label={'description'}
            value={updateProductCmd.description}
            rows={5}
            placeholder={'description'}
            change={changeValue}
            name={'description'}
            error={errors['description']}
          />
          <Input
            label={'price'}
            value={updateProductCmd.price}
            type={'number'}
            placeholder={'price'}
            change={changeValue}
            name={'price'}
            error={errors['price']}
          />
          <Input
            label={'slug'}
            value={updateProductCmd.slug}
            type={'text'}
            placeholder={'slug'}
            change={changeValue}
            name={'slug'}
            error={errors['slug']}
          />
          {anythingEmpty() ? (
            <button className={INVALID_BTN} disabled>
              submit
            </button>
          ) : (
            <button className={VALID_BTN} onClick={updateProduct}>
              submit
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default UpdateProduct
