import React, { useState, useEffect } from 'react' 
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([]) 

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
                setShowAll(initialPersons) 
            })
    }, [])
      

    const [showAll, setShowAll] = useState(persons) 

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter persons={persons} setShowAll={setShowAll} />
            <h2>Add new</h2>
            <PersonForm persons={persons} setPersons={setPersons} setShowAll={setShowAll} />
            <h2>Numbers</h2>
            <Persons persons={persons} showAll={showAll} setPersons={setPersons} setShowAll={setShowAll} />
        </div>
    )
}

export default App

