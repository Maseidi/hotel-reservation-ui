import React, { useState } from 'react'
import Input from './Input'
import axios from 'axios'
import { INVALID_BTN, VALID_BTN } from '../../util/constant'

const Signup = () => {
  const [signupCmd, setSignupCmd] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [errors, setErrors] = useState({})

  const changeValue = (e, name) => {
    setSignupCmd({
      ...signupCmd,
      [name]: e.target.value
    })
  }

  const signup = () => {
    axios
      .post(process.env.URL + '/auth/register', signupCmd)
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        setErrors({})
      })
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
    signupCmd.name == '' ||
    signupCmd.email == '' ||
    signupCmd.password == '' ||
    signupCmd.password_confirmation == ''

  return (
    <div className="p-8 border border-black flex flex-col gap-5">
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
        <button className={INVALID_BTN} disabled>
          signup
        </button>
      ) : (
        <button className={VALID_BTN} onClick={signup}>
          signup
        </button>
      )}
    </div>
  )
}

export default Signup
