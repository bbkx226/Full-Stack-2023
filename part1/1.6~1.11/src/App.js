import { useState } from 'react'

const StatisticLine = ({text, value}) => <tr><td>{text}</td> <td style={{width: "40%"}}>{value}</td></tr>
  
const Statistics = ({allClicks, name, good, neutral, bad}) => {
  let all = good+neutral+bad;
  let average  = ((good-bad)/all).toFixed(2)
  let positive = (((good/(all))*100).toFixed(1)).concat('%')

  if (allClicks.length === 0) return (
    <div>  
      <h1>{name}</h1>
      <p>No feedback given</p>
    </div>
)

  return(
  <>
    <h1>{name}</h1>
    <StatisticLine text="good" value={good} />
    <StatisticLine text="neutral" value={neutral} />
    <StatisticLine text="bad" value={bad} />
    <StatisticLine text="all" value={all} />
    <StatisticLine text="average" value={average} />
    <StatisticLine text="positive" value={positive} />
  </>
)}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    setAll(allClicks.concat('G'))
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat('N'))
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allClicks.concat('B'))
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <Statistics allClicks={allClicks} name="statistics" good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App