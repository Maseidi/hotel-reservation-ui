import React, { useState } from 'react'
import Input from './Input'
import axios from 'axios'

const validAuthSubmit =
  'capitalize bg-submit text-primary rounded-sm p-2 hover:brightness-125 text-lg w-max self-end'
const invalidAuthSubmit =
  'capitalize bg-[gray] text-primary rounded-sm p-2 text-lg w-max self-end'

const Signin = () => {
  const [signinCmd, setSigninCmd] = useState({
    name: '',
    password: ''
  })

  const changeValue = (e, name) => {
    setSigninCmd({
      ...signinCmd,
      [name]: e.target.value
    })
  }

  const signin = () => {
    axios
      .post(process.env.URL + 'api/auth/login', signinCmd)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }

  const anythingEmpty = () =>
    signinCmd.name == '' || signinCmd.password == ''

  return (
    <div className="p-5 bg-primary border border-fourth rounded-bl-md rounded-tr-md rounded-br-md flex flex-col gap-5">
      <Input
        label={'username'}
        type={'text'}
        placeholder={'username'}
        change={changeValue}
        name={'username'}
      />
      <Input
        label={'password'}
        type={'password'}
        placeholder={'password'}
        change={changeValue}
        name={'password'}
      />
      {anythingEmpty() ? (
        <button className={invalidAuthSubmit} disabled>
          signin
        </button>
      ) : (
        <button className={validAuthSubmit} onClick={signin}>
          signin
        </button>
      )}
    </div>
  )
}

export default Signin
