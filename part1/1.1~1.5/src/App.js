import React from 'react'
const Header = (props) => {
  return (
      <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
      <p>{props.part} {props.exercises}</p>
  )
}

const Content = (props) => {
  const parts = props.parts
  return (
    <div>
      { parts.map(x => <Part part={x.name} exercises={x.exercises} />)}
    </div>
  )
}

const Total = (props) => {
  const parts = props.parts
  return (
    <p>Number of exercises {parts[0] + parts[1] + parts[2]}</p>
    )

}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts.map(x => x['exercises'])} />
    </div>
  )
}

export default App