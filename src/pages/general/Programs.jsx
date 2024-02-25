
import React from 'react'
import { Group, LeftRightDouble, RightLeftDouble } from '../../components'

const Programs = ({ isEditable = false }) => {


  return (
    <div>
        <div className="bg-black p-10"></div>
        
        <div className="spacing">
            <h1 className="text-center font-bold text-3xl"></h1>
        </div>

        <div className="spacing">
          <h1 className="text-center text-4xl my-6">Our Programs</h1>
          <Group.Lg position='programs_group' isEditable={isEditable}/>
        </div>
    </div>
  )
}

export default Programs