import React from 'react'
import { Link } from 'react-router-dom'

const search = 'src/assets/images/search.png'
const cart = 'src/assets/images/cart.png'
const user = 'src/assets/images/user.png'

const Header = () => {
  return (
    <header className="mx-20 my-10 border-b-2 p-4 h-fit">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-4xl capitalize">miHotels</h1>
        <div className="flex h-full gap-8">
          <div className="flex gap-8 items-center h-full">
            <nav className="h-full flex gap-8 items-center capitalize">
              <ul className='hover:border-b border-b-black'>
                <li>
                  <Link to={'/hotels'}>shop</Link>
                </li>
              </ul>
              <ul className='hover:border-b border-b-black'>
                <li>
                  <Link to={'/hotels'}>blog</Link>
                </li>
              </ul>
              <ul className='hover:border-b border-b-black'>
                <li>
                  <Link to={'/hotels'}>our story</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="w-[1px] bg-black"></div>
          <div className="h-full flex gap-8">
            <img src={search} alt="search" className="w-7" />
            <img src={cart} alt="cart" className="w-7" />
            <img src={user} alt="user" className="w-7" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
