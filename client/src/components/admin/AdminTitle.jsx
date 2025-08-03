import React from 'react'

const AdminTitle = ({text, description}) => {
  return (
    <div>
    <div className="font-medium text-3xl p-5 text-gray-900">
      {text}
    </div>
    <p className="text-gray-600 mt-2 text-base max-w-3xl mx-5 mt-[-10px]">
       {description}
      </p>
    </div>
  )
}

export default AdminTitle;
