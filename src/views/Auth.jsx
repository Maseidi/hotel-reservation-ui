import React, { useState } from 'react'
import Signup from '../components/Signup'
import Signin from '../components/Signin'
import Background from '../components/Background'

const authBtn =
  'p-2 text-lg rounded-tr-md rounded-tl-md capitalize duration-300 font-bold'
const disable = 'text-primary bg-fourth border border-primary'
const active = 'text-fourth bg-primary hover:bg-tertiary hover:text-fourth border border-fourth'

const Auth = () => {
  const [signup, setSignup] = useState(false)

  const switchTab = () => setSignup(!signup)

  return (
    <>
      <div>
        <Background/>
        <div className="p-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-row gap-2">
            {signup ? (
              <>
                <button className={`${authBtn} ${disable}`} disabled>signup</button>
                <button className={`${authBtn} ${active}`} onClick={switchTab}>
                  signin
                </button>
              </>
            ) : (
              <>
                <button className={`${authBtn} ${active}`} onClick={switchTab}>
                  signup
                </button>
                <button className={`${authBtn} ${disable}`} disabled>signin</button>
              </>
            )}
          </div>
          {signup ? <Signup /> : <Signin />}
        </div>
      </div>
    </>
  )
}

export default Auth
