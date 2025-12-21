import React from 'react'

const CardHolder = ({children}) => {
  return (
    <div className='max-w-3xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {children}
    </div>
  )
}

export default CardHolder