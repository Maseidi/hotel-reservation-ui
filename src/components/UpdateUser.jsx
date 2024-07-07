import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Input from './Input'
import axios from 'axios'
import Select from './Select'

const validAuthSubmit =
  'capitalize bg-submit text-primary rounded-lg p-2 hover:brightness-125 text-lg w-max self-end'
const invalidAuthSubmit =
  'capitalize bg-[gray] text-primary rounded-lg p-2 text-lg w-max self-end'

const UpdateUser = () => {
  const { id } = useParams('id')

  const [updateUserCmd, setUpdateUserCmd] = useState({})

  const [errors, setErrors] = useState({})

  const changeValue = (e, name) => {
    setUpdateUserCmd({
      ...updateUserCmd,
      [name]: e.target.value
    })
  }

  useEffect(() => {
    axios
      .get(process.env.URL + `/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        setUpdateUserCmd({
          name: res.data.name,
          email: res.data.email,
          age: res.data.age,
          isAdmin: res.data.isAdmin
        })
      })
      .catch((err) => setUpdateUserCmd({
        name: 'test',
        email: 'test',
        age: 20,
        isAdmin: true
      }))
  }, [])

  const updateUser = () => {
    axios
      .put(process.env.URL + `/admin/users/${id}`, updateUserCmd, {
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
    updateUserCmd.name == '' ||
    updateUserCmd.email == '' ||
    updateUserCmd.password == '' ||
    updateUserCmd.password_confirmation == ''

  return (
    <div className="m-10 flex flex-col gap-8">
      <h1 className="capitalize text-3xl font-bold">update user</h1>
      <div className="rounded-bl-md rounded-tr-md rounded-br-md flex flex-col gap-4 relative">
        <Input
          label={'username'}
          value={updateUserCmd.name}
          type={'text'}
          placeholder={'username'}
          change={changeValue}
          name={'name'}
          error={errors['name']}
        />
        <Input
          label={'email'}
          value={updateUserCmd.email}
          type={'email'}
          placeholder={'email'}
          change={changeValue}
          name={'email'}
          error={errors['email']}
        />
        <Input
          label={'age'}
          value={updateUserCmd.age}
          type={'number'}
          placeholder={'age'}
          change={changeValue}
          name={'age'}
          error={errors['age']}
        />
        <Select
          label={'role'}
          value={updateUserCmd.isAdmin}
          change={changeValue}
          name={'isAdmin'}
          error={errors['isAdmin']}
          values={[true, false]}
          options={['admin', 'user']}
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
