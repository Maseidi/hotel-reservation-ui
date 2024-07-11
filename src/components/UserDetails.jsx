import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { formatDate } from '../../util/helper'
import Loading from './Loading'
import Reservations from './Reservations'

const UserDetails = () => {
  const { id } = useParams('id')
  const [user, setUser] = useState({})
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get(process.env.URL + `/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        setUser(res.data.user)
        setReservations(res.data.reservations)
      })
      .catch((err) =>
        setUser({
          name: 'test',
          email: 'test@test.com',
          age: 20,
          isAdmin: false,
          createdAt: Date.now() - 10000000000,
          updatedAt: Date.now()
        })
      )
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {loading && <Loading />}
      <div className="m-10 flex flex-col gap-8">
        <h1 className="capitalize text-3xl font-bold">user details</h1>
        <div className="grid grid-cols-2 h-max justify-between w-[50rem] gap-8">
          <span className="capitalize font-bold">username</span>
          <span>{user.name}</span>
          <span className="capitalize font-bold">email</span>
          <span>{user.email}</span>
          {/* <span className="capitalize font-bold">age</span> */}
          {/* <span>{user.age}</span> */}
          <span className="capitalize font-bold">role</span>
          <span>{user.isAdmin ? 'Admin' : 'User'}</span>
          <span className="capitalize font-bold">created</span>
          <span>{formatDate(user.createdAt)}</span>
          {/* <span className="capitalize font-bold">last modified</span> */}
          {/* <span>{formatDate(user.updatedAt)}</span> */}
        </div>
        <Reservations reservations={reservations} />
      </div>
    </>
  )
}

export default UserDetails
