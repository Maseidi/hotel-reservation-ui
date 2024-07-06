import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Input from './Input'
import axios from 'axios'

const validAuthSubmit =
  'capitalize bg-submit text-primary rounded-lg p-2 hover:brightness-125 text-lg w-max self-end'
const invalidAuthSubmit =
  'capitalize bg-[gray] text-primary rounded-lg p-2 text-lg w-max self-end'

const UpdateUser = () => {
  const { id } = useParams('id')

  const [updateUserCmd, setUpdateUserCmd] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [user, setUser] = useState({})

  const [errors, setErrors] = useState({})

  const changeValue = (e, name) => {
    setUpdateUserCmd({
      ...updateUserCmd,
      [name]: e.target.value
    })
  }

  useEffect(() => {
    axios
      .get(process.env.URL + `/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err))
  }, [])

  const updateUser = () => {
    axios
      .post(process.env.URL + '/admin/users/' + id, updateUserCmd)
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
    updateUserCmd.name == '' ||
    updateUserCmd.email == '' ||
    updateUserCmd.password == '' ||
    updateUserCmd.password_confirmation == ''

  return (
    <div className="mt-10 ml-10 flex flex-col gap-8">
      <h1 className="capitalize text-3xl font-bold">update user</h1>
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
        {anythingEmpty() ? (
          <button className={invalidAuthSubmit} disabled>
            submit
          </button>
        ) : (
          <button className={validAuthSubmit} onClick={updateUser}>
            submit
          </button>
        )}
      </div>
    </div>
  )
}

export default UpdateUser
