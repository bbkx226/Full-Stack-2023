import React from 'react'

const Country = ({ country }) => {

    if (!country) {
      return null
    }
    console.log(country.length)
    if (country.length === 0) {
        return <div>not found...</div>
      }
      
    const countries = country[0]
    return (
      <div>
        <h3>{countries.name.common}</h3>
        <div>population {countries.population}</div> 
        <div>capital {countries.capital}</div>
        <img src={countries.flags.png} height='100' alt={`flag of ${countries.name.common}`}/> 
      </div>
    )  
  }

export default Country