import React from 'react'
import Header from '../Header/Header'
import Disclaimer from '../Header/Disclamier'

function Layout({children}) {
  return (
    <div>
        <Header/>
        <Disclaimer />
        {children}
    </div>
  )
}

export default Layout