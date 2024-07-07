import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DeletePopup from './DeletePopup'
import { Link } from 'react-router-dom'
import { formatDate } from '../../util/helper'
import Loading from './Loading'

const headerStyles = 'capitalize border-b border-b-black'

const mock = [
  {
    id: 1,
    name: 'a',
    email: 'a@a.com',
    isAdmin: false,
    createdAt: Date.now()
  },
  {
    id: 2,
    name: 'b',
    email: 'b@b.com',
    isAdmin: true,
    createdAt: Date.now()
  },
  {
    id: 3,
    name: 'c',
    email: 'c@c.com',
    isAdmin: false,
    createdAt: Date.now()
  },
  {
    id: 4,
    name: 'd',
    email: 'd@d.com',
    isAdmin: true,
    createdAt: Date.now()
  }
]

const Users = () => {
  const [page, setPage] = useState(1)
  const [data, setData] = useState({ users: [] })
  const [id2Delete, setId2Delete] = useState(null)
  const [loading, setLoading] = useState(false)

  const getData = () => {
    setLoading(true)
    axios
      .get(process.env.URL + '/admin/users?page=' + page, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        setData({
          users: mock
        })
      })
      .finally((fin) => setLoading(false))
  }

  const nextPage = () => {
    if (page == data.totalPages) return
    setPage(page + 1)
  }

  const previousPage = () => {
    if (page == 1) return
    setPage(page - 1)
  }

  useEffect(() => {
    getData()
  }, [page])

  const deleteById = (id) => {
    setLoading(true)
    axios
      .delete(process.env.URL + '/admin/users/' + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        console.log(res)
        setId2Delete(null)
        getData()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      {id2Delete && (
        <DeletePopup
          id={id2Delete}
          setId={setId2Delete}
          callback={deleteById}
          entity={'user'}
        />
      )}
      {loading && <Loading />}
      <div className="m-10 flex flex-col gap-20">
        <div className="grid grid-cols-5 gap-y-6 gap-x-8 h-max text-center">
          <div className={headerStyles}>username</div>
          <div className={headerStyles}>email</div>
          <div className={headerStyles}>role</div>
          <div className={headerStyles}>created date</div>
          <div className={headerStyles}>operations</div>
          {data.users.map((elem) => {
            return (
              <>
                <div>{elem.name}</div>
                <div>{elem.email}</div>
                <div>{elem.isAdmin ? 'Admin' : 'User'}</div>
                <div>{formatDate(elem.createdAt)}</div>
                <div className="flex justify-between gap-8">
                  <button
                    className="cursor-pointer text-red-500 capitalize"
                    onClick={() => setId2Delete(elem._id)}
                  >
                    delete
                  </button>
                  <Link
                    to={'/admin/users/edit/' + elem._id}
                    className="cursor-pointer text-secondary capitalize"
                  >
                    update
                  </Link>
                  <Link
                    to={'/admin/users/' + elem._id}
                    className="text-fourth capitalize"
                  >
                    details
                  </Link>
                </div>
              </>
            )
          })}
        </div>
        <div className="flex self-center gap-20">
          <button className="capitalize" onClick={previousPage}>
            previous
          </button>
          <span>
            {page} {data.currentPage ? `of ${data.totalPages}` : ''}
          </span>
          <button className="capitalize" onClick={nextPage}>
            next
          </button>
        </div>
      </div>
    </>
  )
}

export default Users
