import React from 'react'

const DeletePopup = (params) => {
  const { id, setId, callback, entity } = params

  return (
    <div className="fixed w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.7)]">
      <div className="bg-black p-8 flex flex-col gap-8 text-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md">
        <p>Are you sure you wish to remove this {entity}?</p>
        <div className="flex justify-between">
          <button
            className="bg-submit p-2 rounded-md capitalize"
            onClick={() => callback(id)}
          >
            yes
          </button>
          <button
            className="bg-cancel p-2 rounded-md capitalize"
            onClick={() => setId(null)}
          >
            no
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletePopup
