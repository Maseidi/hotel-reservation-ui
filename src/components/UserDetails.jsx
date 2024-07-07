import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UserDetails = () => {
  const { id } = useParams('id')

  const [user, setUser] = useState({})

  useEffect(() => {
    axios
      .get(process.env.URL + `/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="m-10 flex flex-col gap-8">
      <h1 className="capitalize text-3xl font-bold">user details</h1>
      <div className="grid grid-cols-2 h-max justify-between w-[50rem] gap-8">
        <span className="capitalize font-bold">username</span>
        <span>{user.name}</span>
        <span className="capitalize font-bold">email</span>
        <span>{user.email}</span>
        <span className="capitalize font-bold">age</span>
        <span>{user.age}</span>
        <span className="capitalize font-bold">role</span>
        <span>{user.isAdmin ? 'Admin' : 'User'}</span>
        <span className="capitalize font-bold">created</span>
        <span>{user.createdAt}</span>
        <span className="capitalize font-bold">last modified</span>
        <span>{user.updatedAt}</span>
      </div>
    </div>
  )
}

export default UserDetails
