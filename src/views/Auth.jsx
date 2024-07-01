import React, { useState } from 'react'
import Signup from '../components/Signup'
import Signin from '../components/Signin'

const authBtn = 'p-2 text-sm rounded-tr-md rounded-tl-md capitalize duration-300 font-bold'
const active = 'text-primary bg-fourth'
const disable = 'text-fourth bg-primary hover:bg-tertiary hover:text-fourth'

const Auth = () => {
  const [signup, setSignup] = useState(false)

  const switchTab = () => setSignup(!signup)

  return (
    <>
      <div className="p-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-row gap-2">
          {signup ? (
            <>
              <button className={`${authBtn} ${active}`}>signup</button>
              <button className={`${authBtn} ${disable}`} onClick={switchTab}>
                signin
              </button>
            </>
          ) : (
            <>
              <button className={`${authBtn} ${disable}`} onClick={switchTab}>
                signup
              </button>
              <button className={`${authBtn} ${active}`}>signin</button>
            </>
          )}
        </div>
        {signup ? <Signup /> : <Signin />}
      </div>
    </>
  )
}

export default Auth
