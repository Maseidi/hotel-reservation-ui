import React from 'react'
import { formatDate } from '../../util/helper'

const Reservations = (params) => {
  const { reservations, type } = params

  return (
    <div>
      <h1 className="font-bold text-3xl my-10">Reservations</h1>
      <div className="grid grid-cols-8 gap-10 text-center">
        {type == 'products' ? (
          <div className="capitalize">username</div>
        ) : (
          <div className="capitalize">product name</div>
        )}
        <div className="capitalize">price</div>
        <div className="capitalize">track id</div>
        <div className="capitalize">status</div>
        <div className="capitalize">start date</div>
        <div className="capitalize">end date</div>
        <div className="capitalize">created at</div>
        <div className="capitalize">updated at</div>
        {Array.from(reservations).filter(elem => !elem).map((elem) => {
          return (
            <>
              {type == 'products' ? (
                <div>{elem.userDetails.name}</div>
              ) : (
                <div className="capitalize">{elem.productDetails.title}</div>
              )}
              <div>{elem.price}</div>
              <div>{elem.trackId}</div>
              <div>{elem.status ? 'done' : 'not done'}</div>
              <div>{formatDate(elem.date.startDate)}</div>
              <div>{formatDate(elem.date.endDate)}</div>
              <div>{formatDate(elem.createdAt)}</div>
              <div>{formatDate(elem.updatedAt)}</div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Reservations
