import React from 'react'
import OptionGroup from './OptionGroup'

const AdminMenu = () => {
  return (
    <div className="w-52 h-[100vh] bg-black text-primary flex flex-col p-4 gap-10 fixed">
      <OptionGroup
        heading={'users'}
        options={['view users', 'submit user']}
        urls={['/admin/users', '/admin/users/submit']}
      />
      <OptionGroup
        heading={'products'}
        options={['view products', 'submit product']}
        urls={['/admin/products', '/admin/products/submit']}
      />
    </div>
  )
}

export default AdminMenu
