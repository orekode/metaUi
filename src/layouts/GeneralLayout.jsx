import React from 'react'
import { Outlet } from 'react-router-dom'
import { Nav } from '../components'

const GeneralLayout = ({ isEditable }) => {
  return (
    <div>
        <Nav isEditable={isEditable}/>
        
        <div className="min-h-screen">
          <Outlet isEditable={isEditable} />
        </div>

        <footer className="p-6 text-white text-center bg-[#222]">
            Copyright ©2023 All rights reserved 
        </footer>
    </div>
  )
}

export default GeneralLayout