import React from 'react'
import Content from './Content'
import Header from './Header'
import Total from './Total'

const Course = ({course}) => {
  return (
    <div>
        <Header head={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts.map(x => x['exercises'])} />
    </div>
  )
}

export default Course