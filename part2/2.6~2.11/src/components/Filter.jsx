import React from 'react'
import { useState, useEffect } from 'react'

const Filter = ({persons, searchTerm, empty}) => {
    const [filteredPeople, setFilteredPeople] = useState(persons);

    useEffect(() => {
        const results = persons.filter((person) =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPeople(results);
    }, [persons, searchTerm]);

  return (
    <div>
        {{empty} ? filteredPeople.map(person => <h3 key={person.id}>{person.name} {person.number}</h3>) : {persons}.map(person => <h3 key={person.id}>{person.name} {person.number}</h3>)}
    </div>
  )
}

export default Filter