
import React from 'react'
import { Group, LeftRightDouble, RightLeftDouble } from '../../components'

const About = ({ isEditable = false }) => {


  return (
    <div>
        <div className="bg-black p-10"></div>
        <LeftRightDouble position={'about_left_right_one'}   isEditable={isEditable}/>
        <RightLeftDouble position={'about_left_right_two'}   isEditable={isEditable}/>
        <LeftRightDouble position={'about_left_right_three'} isEditable={isEditable}/>

        <div className="spacing">
          <h1 className="text-center text-4xl my-6">Our Champions</h1>
          <Group.Sm position='about_champions_group' isEditable={isEditable}/>
        </div>
    </div>
  )
}

export default About