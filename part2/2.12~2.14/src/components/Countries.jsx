import React from 'react'
import Country from './Country'

const Countries = ({ filter, countries, weather, showCountry, handleCountry }) => {
  
  const filterCountry = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()));

  if (filterCountry.length === countries.length) {
    return (<div></div>)

  } else if (filterCountry.length === 1) {
    handleCountry(filterCountry[0].capital)
    return (
        <h3 key={filterCountry[0].name.common}>
          <Country country={filterCountry[0]} weather={weather} />
        </h3>
    )
  } else if (filterCountry.length <= 10) {
    return (
      filterCountry.map((country) =>
        <div key={country.name.common}>
          {country.name.common}
          <button type='button' value={country.name.common} onClick={showCountry}>show</button>
          <br />
        </div>
      )
    )
  } else {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
}

export default Countries