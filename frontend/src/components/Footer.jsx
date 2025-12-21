import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-black flex items-center justify-center'>
      <div className='p-4'>
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </div>
      
    </footer>
  )
}

export default Footer