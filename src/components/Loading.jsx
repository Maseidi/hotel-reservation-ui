import React from 'react'

const Loading = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-[10] fixed">
      <div className="loader"></div>
    </div>
  )
}

export default Loading
