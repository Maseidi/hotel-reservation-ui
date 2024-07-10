import React, { useState } from 'react'
import Input from './Input'
import axios from 'axios'
import { INVALID_BTN, VALID_BTN } from '../../util/constant'

const Signin = () => {
  const [signinCmd, setSigninCmd] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  
  const changeValue = (e, name) => {
    setSigninCmd({
      ...signinCmd,
      [name]: e.target.value
    })
  }

  const signin = () => {
    axios
      .post(process.env.URL + '/auth/login', signinCmd)
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

  const anythingEmpty = () => signinCmd.email == '' || signinCmd.password == ''

  return (
    <div className="p-8 bg-primary border border-black flex flex-col gap-5">
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
        <button className={INVALID_BTN} disabled>
          signin
        </button>
      ) : (
        <button className={VALID_BTN} onClick={signin}>
          signin
        </button>
      )}
    </div>
  )
}

export default Signin
