import React from 'react'

const Country = ({ country, weather }) => {
  const language = country.languages
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital} <br/> area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.keys(language).map((key) => <li key={key}> {language[key]} </li>)}
      </ul>
      <img src={country.flags.png} alt={`${country.name}'s Flag`}height="120" width="240"/>
      <h2>Weather in {country.capital}</h2>
      <h3>temperature: {(weather.main.temp-273.15).toFixed(2)} Celsius</h3>
      <h3>wind: {weather.wind.speed} m/s</h3>
    </div>
  )
}

export default Country