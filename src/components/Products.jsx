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
    title: 'a',
    price: 1000,
    code: 12,
    createdAt: Date.now()
  },
  {
    id: 2,
    title: 'b',
    price: 1500,
    code: 23,
    createdAt: Date.now()
  },
  {
    id: 3,
    title: 'c',
    price: 500,
    code: 34,
    createdAt: Date.now()
  },
  {
    id: 4,
    title: 'd',
    price: 3000,
    code: 37,
    createdAt: Date.now()
  }
]

const Products = () => {
  const [page, setPage] = useState(1)
  const [data, setData] = useState({ products: [] })
  const [id2Delete, setId2Delete] = useState(null)
  const [loading, setLoading] = useState(false)

  const getData = () => {
    setLoading(true)
    axios
      .get(process.env.URL + '/admin/products?page=' + page, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        setData(res.data)
      })
      .catch((err) =>
        setData({
          products: mock
        })
      )
      .finally(() => setLoading(false))
  }

  const nextPage = () => {
    if (page == data.totalPages) return
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
    setLoading(true)
    axios
      .delete(process.env.URL + '/admin/products/' + id, {
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
      {loading && <Loading />}
      {id2Delete && (
        <DeletePopup
          id={id2Delete}
          setId={setId2Delete}
          callback={deleteById}
          entity={'product'}
        />
      )}
      <div className="m-10 flex flex-col gap-20">
        <div className="grid grid-cols-5 gap-y-6 gap-x-8 h-max text-center">
          <div className={headerStyles}>title</div>
          <div className={headerStyles}>price</div>
          <div className={headerStyles}>code</div>
          <div className={headerStyles}>created date</div>
          <div className={headerStyles}>operations</div>
          {data.products.map((elem) => {
            return (
              <>
                <div>{elem.title}</div>
                <div>{elem.price}$</div>
                <div>{elem.code}</div>
                <div>{formatDate(elem.createdAt)}</div>
                <div className="flex justify-between gap-8">
                  <button
                    className="cursor-pointer text-red-500 capitalize"
                    onClick={() => setId2Delete(elem.id)}
                  >
                    delete
                  </button>
                  <Link
                    to={'/admin/products/edit/' + elem.id}
                    className="cursor-pointer text-secondary capitalize"
                  >
                    update
                  </Link>
                  <Link
                    to={'/admin/products/' + elem.id}
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

export default Products
