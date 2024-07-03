import React, { useState } from 'react'
import Input from './Input'
import axios from 'axios'

const validAuthSubmit =
  'capitalize bg-submit text-primary rounded-sm p-2 hover:brightness-125 text-lg w-max self-end'
const invalidAuthSubmit =
  'capitalize bg-[gray] text-primary rounded-sm p-2 text-lg w-max self-end'

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
      .post(process.env.URL + 'api/auth/register', signupCmd)
      .then((res) => console.log(res))
      .catch((err) => {
        let errorMap = {}
        err.response.data.errors.forEach(elem => {
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
    <div className="p-5 bg-primary border border-fourth rounded-bl-md rounded-tr-md rounded-br-md flex flex-col gap-4 relative">
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
          signup
        </button>
      ) : (
        <button className={validAuthSubmit} onClick={signup}>
          signup
        </button>
      )}
    </div>
  )
}

export default Signup
