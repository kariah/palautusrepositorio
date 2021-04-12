import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
    //    const [persons, setPersons] = useState([
    //        { id: 1, name: 'Arto Hellas', number: '040-123456' },
    //        { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    //      //{ id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    //      //{ id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
    //    ])

    const [persons, setPersons] = useState([])

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                console.log('response data ', response.data)

                setPersons(response.data)
                setShowAll(response.data)
            })
    }, [])
    console.log('render', persons.length, 'persons')

    const [showAll, setShowAll] = useState(persons)

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter persons={persons} setShowAll={setShowAll} />
            <h2>Add new</h2>
            <PersonForm persons={persons} setPersons={setPersons} setShowAll={setShowAll} />
            <h2>Numbers</h2>
            <Persons persons={showAll} />
        </div>
    )
}

export default App

