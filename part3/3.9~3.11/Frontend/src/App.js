import { useState, useEffect } from 'react'
import Header from './components/Header'
import Input from './components/Input'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567', id: '1'}]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [empty, setEmpty] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [stateMessage, setStateMessage] = useState('')
  const [filteredPeople, setFilteredPeople] = useState(persons)


  // Add person to the server
  const addPerson = (event) => {

    setEmpty(false)
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const changedPerson = persons.filter(x => x.name === newName)
    if (persons.some((person) => person.name === newName)){
      if(window.confirm(`${newName} is already added to phonebook , replace the old number with a new one?`)){
        personService
          .update(changedPerson[0].id, personObject)
          .then((response) =>{
            setPersons(persons.map(personItem => personItem.id !== changedPerson[0].id ? personItem : response.data))
            console.log(persons)
            setNewName('')
            setNewNumber('')  
          })
          .catch(error => {
            setPersons(persons.filter(x => x.id !== changedPerson[0].id))
            setErrorMessage(`Information of "${newName}" has already been removed from the server`)
            setStateMessage("error")
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')  
          })
          
      } else{
        setNewName('')
        setNewNumber('')
      }
      
      return
    }
      
    personService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
    })
    .catch(error => {
      setErrorMessage("Something went wrong!")
      setStateMessage("error")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })

    setErrorMessage(
      `Added "${newName}" as the new user`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setStateMessage("good")
    setNewName('')
    setNewNumber('')

  }
  
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setSearchTerm(event.target.value);

  // Filter
  useEffect(() => {
    const results = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPeople(results);
  }, [persons, searchTerm]);

  // Display Persons
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // Delete items and re-render
  function handleDelete(name, id){
    if(window.confirm(`Delete ${name}`)){
      personService
        .clearPerson(`${id}`)
        .then(response=>{
          console.log(persons)
        })
      setPersons(persons.filter(n => n.id !== id))  
    }
  }

  return (
    <div>
      <Header head="Phonebook"/>
      <Notification message={errorMessage} state={stateMessage}/>
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
      <div>
        {empty ? 
        filteredPeople.map(person => 
        <h3 key={person.id}>{person.name} {person.number} 
        <button type="submit" onClick={() => handleDelete(person.name, person.id)}>delete</button>
        </h3>) : 
        persons.map(person => 
        <h3 key={person.id}>{person.name} {person.number} 
        <button type="button" onClick={() => handleDelete(person.name, person.id)}>delete</button></h3>)
        }
      </div>

    </div>
  )
}

export default App