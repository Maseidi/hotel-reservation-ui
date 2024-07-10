import React, { useState } from 'react'
import Signup from '../components/Signup'
import Signin from '../components/Signin'

const authBtn =
  'p-2 text-lg capitalize duration-300 font-bold border-r border-l border-t border-black'
const disable = 'text-white bg-black'
const active = 'text-black bg-white hover:bg-black hover:text-white'

const Auth = () => {
  const [signup, setSignup] = useState(false)

  const switchTab = () => setSignup(!signup)

  return (
    <>
      <div>
        <div className="p-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-row gap-2">
            {signup ? (
              <>
                <button className={`${authBtn} ${disable}`} disabled>
                  signup
                </button>
                <button className={`${authBtn} ${active}`} onClick={switchTab}>
                  signin
                </button>
              </>
            ) : (
              <>
                <button className={`${authBtn} ${active}`} onClick={switchTab}>
                  signup
                </button>
                <button className={`${authBtn} ${disable}`} disabled>
                  signin
                </button>
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
