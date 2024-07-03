import React from 'react'

const images = new Array(7)
  .fill(null)
  .map((elem, index) => (
    <img
      src={`src/assets/images/h${index + 1}.jpg`}
      alt={`hotel-${index + 1}`}
      className="h-full"
    />
  ))

const Background = () => {
  return (
    <div className="w-full h-[100vh] bg-secondary overflow-hidden blur-sm grayscale-[60%]">
      <div className="w-full h-full grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 rotate-6 scale-150">
        {[...images, ...images].map((elem) => elem)}
      </div>
    </div>
  )
}

export default Background
