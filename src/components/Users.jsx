import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DeletePopup from './DeletePopup'

const headerStyles = 'capitalize border-b border-b-black'

const data = [
  {
    id: 1,
    username: 'a',
    email: 'a@a.com',
    isAdmin: false,
    createdAt: Date.now()
  },
  {
    id: 2,
    username: 'b',
    email: 'b@b.com',
    isAdmin: true,
    createdAt: Date.now()
  },
  {
    id: 3,
    username: 'c',
    email: 'c@c.com',
    isAdmin: false,
    createdAt: Date.now()
  },
  {
    id: 4,
    username: 'd',
    email: 'd@d.com',
    isAdmin: true,
    createdAt: Date.now()
  }
]

const Users = () => {
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState([])
  const [id2Delete, setId2Delete] = useState(null)

  const getData = () => {
    axios
      .get(process.env.URL + '/admin/users?page=' + page)
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => setUsers(data))
  }

  const nextPage = () => {
    setPage(page + 1)
    getData()
  }

  const previousPage = () => {
    if (page == 1) return
    setPage(page - 1)
    getData()
  }

  useEffect(() => {
    getData()
  }, [])

  const deleteById = (id) => {
    axios
      .delete(process.env.URL + '/admin/user/' + id)
      .then((res) => {
        console.log(res)
        setId2Delete(null)
        getData()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      {id2Delete && (
        <DeletePopup
          id={id2Delete}
          setId={setId2Delete}
          callback={deleteById}
        />
      )}
      <div className="ml-10 mt-10 flex flex-col gap-20">
        <div className="grid grid-cols-5 gap-8 h-max text-center">
          <div className={headerStyles}>username</div>
          <div className={headerStyles}>email</div>
          <div className={headerStyles}>role</div>
          <div className={headerStyles}>created date</div>
          <div className={headerStyles}>operations</div>
          {users.map((elem) => {
            return (
              <>
                <div>{elem.username}</div>
                <div>{elem.email}</div>
                <div>{elem.isAdmin ? 'Admin' : 'User'}</div>
                <div>{elem.createdAt}</div>
                <div className="flex justify-between gap-8">
                  <button
                    className="cursor-pointer text-red-500 capitalize"
                    onClick={() => setId2Delete(elem.id)}
                  >
                    delete
                  </button>
                  <button className="cursor-pointer text-secondary capitalize">
                    update
                  </button>
                  <button className="cursor-pointer text-fourth capitalize">
                    details
                  </button>
                </div>
              </>
            )
          })}
        </div>
        <div className="flex self-center gap-20">
          <button className="capitalize" onClick={previousPage}>
            previous
          </button>
          <span>{page}</span>
          <button className="capitalize" onClick={nextPage}>
            next
          </button>
        </div>
      </div>
    </>
  )
}

export default Users
