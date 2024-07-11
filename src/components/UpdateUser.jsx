import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Input from './Input'
import axios from 'axios'
import Select from './Select'
import Loading from './Loading'
import { INVALID_BTN, VALID_BTN } from '../../util/constant'

const UpdateUser = () => {
  const { id } = useParams('id')
  const [updateUserCmd, setUpdateUserCmd] = useState({})
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const changeValue = (e, name) => {
    setUpdateUserCmd({
      ...updateUserCmd,
      [name]: e.target.value
    })
  }

  useEffect(() => {
    setLoading(true)
    axios
      .get(process.env.URL + `/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        setUpdateUserCmd({
          name: res.data.user.name,
          email: res.data.user.email,
          password: res.data.user.password,
          age: res.data.user.age,
          isAdmin: res.data.user.isAdmin
        })
      })
      .catch((err) =>
        setUpdateUserCmd({
          name: 'test',
          email: 'test',
          password: '',
          password_confirmation: '',
          age: 20,
          isAdmin: true
        })
      )
      .finally(() => setLoading(false))
  }, [])

  const updateUser = () => {
    setLoading(true)
    axios
      .put(process.env.URL + `/admin/users/${id}`, updateUserCmd, {
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
    updateUserCmd.name == '' ||
    updateUserCmd.email == '' ||
    updateUserCmd.password == '' ||
    updateUserCmd.password_confirmation == ''

  return (
    <>
      {loading && <Loading />}
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
            label={'password'}
            value={updateUserCmd.password}
            type={'password'}
            placeholder={'password'}
            change={changeValue}
            name={'password'}
            error={errors['password']}
          />
          <Input
            label={'confirm password'}
            value={updateUserCmd.password_confirmation}
            type={'password'}
            placeholder={'confirm password'}
            change={changeValue}
            name={'password_confirmation'}
            error={errors['password_confirmation']}
          />
          {anythingEmpty() ? (
            <button className={INVALID_BTN} disabled>
              submit
            </button>
          ) : (
            <button className={VALID_BTN} onClick={updateUser}>
              submit
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default UpdateUser
