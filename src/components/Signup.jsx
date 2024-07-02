import React, { useState } from 'react'
import Input from './Input'
import { email, key, lock, user } from '../util/image-urls'
import axios from 'axios'

const validAuthSubmit =
  'capitalize bg-submit text-primary rounded-sm p-2 hover:brightness-125 text-xs w-max self-end'
const invalidAuthSubmit =
  'capitalize bg-[gray] text-primary rounded-sm p-2 text-xs w-max self-end'

const Signup = () => {
  const [signupCmd, setSignupCmd] = useState({
    username: '',
    email: '',
    password: '',
    passwordRepeat: ''
  })

  const changeValue = (e, name) => {
    setSignupCmd({
      ...signupCmd,
      [name]: e.target.value
    })
  }

  const signup = () => {
    axios
      .post(process.env.URL, signupCmd)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }

  const anythingEmpty = () =>
    signupCmd.username == '' ||
    signupCmd.email == '' ||
    signupCmd.password == '' ||
    signupCmd.passwordRepeat == ''

  return (
    <div className="p-5 bg-primary border border-fourth rounded-bl-md rounded-tr-md rounded-br-md flex flex-col gap-4 relative">
      <Input
        label={'username'}
        type={'text'}
        img={user}
        placeholder={'username'}
        change={changeValue}
        name={'username'}
      />
      <Input
        label={'email'}
        type={'email'}
        img={email}
        placeholder={'email'}
        change={changeValue}
        name={'email'}
      />
      <Input
        label={'password'}
        type={'password'}
        img={key}
        placeholder={'password'}
        change={changeValue}
        name={'password'}
      />
      <Input
        label={'password repeat'}
        type={'password'}
        img={lock}
        placeholder={'password repeat'}
        change={changeValue}
        name={'passwordRepeat'}
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
