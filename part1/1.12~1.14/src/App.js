import React, { useState } from 'react'


const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Text = ({title, content, voting}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <p>has {voting} votes</p>
    </div>
  )
}
const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
]

const App = () => {
  console.log("test")

  const [selected, setSelected] = useState(0)
  const [points, vote_point] = useState(Array(anecdotes.length).fill(0))

  let randomNum = Math.floor(Math.random()*(anecdotes.length))
  console.log(randomNum)
  let copy = [...points]
  copy[selected] += 1
  const indexMax = points.indexOf(Math.max(...points))

  return (
    <div>
      <Text title="Anecdote of the day" content={anecdotes[selected]} voting={points[selected]}/>
        <div>
          <Button onClick={() => vote_point(copy)} text="vote"/>
          <Button onClick={() => setSelected(randomNum)} text="next anecdotes"/>
        </div>
      <Text title="Anecdote with most votes" content={anecdotes[indexMax]} voting={points[indexMax]}/>
    </div>


  )
}

export default App