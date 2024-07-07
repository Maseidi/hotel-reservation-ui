import React, { useRef, useState } from 'react'
import Input from './Input'
import axios from 'axios'
import Loading from './Loading'

const validAuthSubmit =
  'capitalize bg-submit text-primary rounded-lg p-2 hover:brightness-125 text-lg w-max self-end'
const invalidAuthSubmit =
  'capitalize bg-[gray] text-primary rounded-lg p-2 text-lg w-max self-end'

const SubmitProduct = () => {
  const [storeProductCmd, setStoreProductCmd] = useState({
    title: '',
    price: 0,
    description: '',
    slug: '',
    img: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const fileRef = useRef(null)

  const handleFileChange = () => {
    const data = new FormData()
    data.append('file', fileRef.current.files[0])
    setStoreProductCmd({
      ...storeProductCmd,
      img: data
    })
  }

  const changeValue = (e, name) => {
    if (name == 'price') if (e.target.value < 0) return
    if (name == 'img') {
      handleFileChange()
      return
    }
    setStoreProductCmd({
      ...storeProductCmd,
      [name]: e.target.value
    })
  }

  const storeUser = () => {
    setLoading(true)
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
      .finally(() => setLoading(false))
  }

  const anythingEmpty = () =>
    storeProductCmd.title == '' || storeProductCmd.description == ''

  return (
    <>
      {loading && <Loading />}
      <div className="m-10 flex flex-col gap-8">
        <h1 className="capitalize text-3xl font-bold">submit product</h1>
        <div className="rounded-bl-md rounded-tr-md rounded-br-md flex flex-col gap-4 relative">
          <Input
            label={'title'}
            value={storeProductCmd.title}
            type={'text'}
            placeholder={'title'}
            change={changeValue}
            name={'title'}
            error={errors['title']}
          />
          <Input
            label={'price'}
            value={storeProductCmd.price}
            type={'number'}
            placeholder={'price'}
            change={changeValue}
            name={'price'}
            error={errors['price']}
          />
          <Input
            label={'description'}
            value={storeProductCmd.description}
            rows={5}
            placeholder={'description'}
            change={changeValue}
            name={'description'}
            error={errors['description']}
          />
          <Input
            label={'slug (optional)'}
            value={storeProductCmd.slug}
            type={'text'}
            placeholder={'slug'}
            change={changeValue}
            name={'slug'}
            error={errors['slug']}
          />
          <Input
            label={'picture'}
            value={storeProductCmd.img.name}
            type={'file'}
            placeholder={'select picture'}
            change={changeValue}
            name={'img'}
            error={errors['img']}
            ref={fileRef}
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
    </>
  )
}

export default SubmitProduct
