import React from 'react'

const Total = ({parts}) => {
    const initial = 0
    const total = parts.reduce((acc, curr) => acc + curr, initial)
  return (
    <div>
        <b>total of {total} exercises</b>
    </div>
  )
}

export default Total