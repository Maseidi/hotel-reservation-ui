import React, { useState } from 'react'
import { key, user } from '../util/image-urls'
import Input from './Input'
import axios from 'axios'

const Signin = () => {
  const [signinCmd, setSigninCmd] = useState({
    username: '',
    password: ''
  })

  const changeValue = (e, name) => {
    setSigninCmd({
      ...signinCmd,
      [name]: e.target.value
    })
  }

  const signin = () => {
    axios.post(process.env.URL, signinCmd).then(res => console.log(res)).catch(err => console.error(err))
  }

  return (
    <div className="p-5 bg-primary border border-fourth rounded-bl-md rounded-tr-md rounded-br-md flex flex-col gap-5">
      <Input
        label={'username'}
        type={'text'}
        img={user}
        placeholder={'username'}
        change={changeValue}
        name={'username'}
      />
      <Input
        label={'password'}
        type={'password'}
        img={key}
        placeholder={'password'}
        change={changeValue}
        name={'username'}
      />
      <button className="capitalize bg-submit text-primary rounded-sm p-1 hover:brightness-125 text-xs" onClick={signin}>
        submit
      </button>
    </div>
  )
}

export default Signin
