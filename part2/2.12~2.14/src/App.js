import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Input from './components/Input';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([])
  const [capital, setCapital] = useState('London')
  const [weather, setWeather] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const apiKey = process.env.REACT_APP_API_KEY;
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`

  // Country
  useEffect(() => {
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])
  
  // Weather
  useEffect(() => {
  axios
    .get(weatherAPI)
    .then(response => {
        setWeather(response.data)
    })
  }, [weatherAPI, capital])

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }
  const showCountry = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }

  const handleCountry = (capital) => setCapital(capital)

  return (
    <div>
      <Input text='find countries' value={newFilter} onChange={handleFilter} />
      <Countries filter={newFilter} countries={countries} weather={weather} 
        showCountry={showCountry} handleCountry={handleCountry}/>
    </div>
  )
}

export default App;