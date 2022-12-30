import { useState } from 'react'
import Header from './components/Header'
import Input from './components/Input'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567', id: '1'}]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [empty, setEmpty] = useState(false) 

  const addPerson = (event) => {
    setEmpty(false)

    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length +1,
    }
    
    if (persons.some((person) => person.name === newName)) return alert(`${newName} is already added to phonebook`)
    
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')

  }
  
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setSearchTerm(event.target.value);

  return (
    <div>
      <Header head="Phonebook"/>
      <Input text="filter shown with" value={searchTerm} onInput={() => setEmpty(true)} onChange={handleFilter}/>
      <Header head="add a new"/>
      <form onSubmit={addPerson}>
          <Input text="name" value={newName} onChange={handleNameChange}/>
          <Input text="number" value={newNumber} onChange={handleNumberChange}/>
          <div>
            <button type="submit">add</button>
          </div>
      </form>
      <Header head="Numbers"/>
      {<Filter persons={persons} searchTerm={searchTerm} empty={empty} />}
    </div>
  )
}

export default App