import React, { useEffect, useRef, useState } from 'react'
import Input from './Input'

const validAuthSubmit =
  'capitalize bg-submit text-primary rounded-lg p-2 hover:brightness-125 text-lg w-max self-end'
const invalidAuthSubmit =
  'capitalize bg-[gray] text-primary rounded-lg p-2 text-lg w-max self-end'

const SubmitUser = () => {
  const [storeUserCmd, setStoreUserCmd] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const [errors, setErrors] = useState({})

  const changeValue = (e, name) => {
    setStoreUserCmd({
      ...storeUserCmd,
      [name]: e.target.value
    })
  }

  const storeUser = () => {
    axios
      .post(process.env.URL + '/admin/users', storeUserCmd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err)
        if (err.response.status != 419) return
        let errorMap = {}
        err.response.data.errors.forEach((elem) => {
          errorMap[elem.path] = elem.msg
        })
        setErrors(errorMap)
      })
  }

  const anythingEmpty = () =>
    storeUserCmd.name == '' ||
    storeUserCmd.email == '' ||
    storeUserCmd.password == '' ||
    storeUserCmd.password_confirmation == ''

  return (
    <div className="m-10 flex flex-col gap-8">
      <h1 className="capitalize text-3xl font-bold">submit user</h1>
      <div className="rounded-bl-md rounded-tr-md rounded-br-md flex flex-col gap-4 relative">
        <Input
          label={'username'}
          type={'text'}
          placeholder={'username'}
          change={changeValue}
          name={'name'}
          error={errors['name']}
        />
        <Input
          label={'email'}
          type={'email'}
          placeholder={'email'}
          change={changeValue}
          name={'email'}
          error={errors['email']}
        />
        <Input
          label={'password'}
          type={'password'}
          placeholder={'password'}
          change={changeValue}
          name={'password'}
          error={errors['password']}
        />
        <Input
          label={'confirm password'}
          type={'password'}
          placeholder={'confirm password'}
          change={changeValue}
          name={'password_confirmation'}
          error={errors['password_confirmation']}
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

export default SubmitUser
