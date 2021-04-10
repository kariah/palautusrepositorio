import React, { useState } from 'react'
import PersonDetail from './components/PersonDetail'

const App = () => {
    const [persons, setPersons] = useState([ 
        { id: 1, name: 'Arto Hellas', number: '040-123456' },
        { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
        { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
        { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])

    const [newPerson, setNewPerson] = useState({
        person: {
            id: 0,
            name: "",
            number: ""
        }
    });

    const [showAll, setShowAll] = useState(persons)

    const addPerson = (event) => {
        event.preventDefault()

        if (newPerson.person.name != undefined) {
            let personFound = (persons.find(person => person.name === newPerson.person.name) ? true : false)
            if (personFound) {
                alert(`${newPerson.person.name} is already added to phonebook`);
                return;
            }
        }


        const personObject = {
            name: newPerson.person.name,
            number: newPerson.person.number,
            id: persons.length + 1,
        }

        setPersons(persons.concat(personObject))
        setShowAll(persons.concat(personObject))

        setNewPerson({
            person: {
                id: 0,
                name: "",
                number: ""
            }
        })
    }


    const handlePersonChange = (event) => {
        let name = newPerson.person.name
        let number = newPerson.person.number

        if (event.target.id === "name") {
            name = event.target.value
        }
        else if (event.target.id === "number") {
            number = event.target.value
        }


        setNewPerson({
            ...newPerson, person: {
                name: name,
                number: number
            }
        },
        )
    }


    const filterPersons = (event) => {
        console.log("value: ", event.target.value)

        let filterValue = event.target.value

        if (persons.length > 0) {
            const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase())
            )



            if (filteredPersons.length > 0) {
                setShowAll(filteredPersons)
            }
            else {
                setShowAll([])
            }

            //console.log("showAll ", showAll)

        }

    }


    return (
        <div>
            <h1>Phonebook</h1>
            <div>
                Filter shown with
                <input onChange={filterPersons}>
                </input>
            </div>
            <h2>Add new</h2>
            <form onSubmit={addPerson}>
                <div>
                    Name:
                    <input
                        value={newPerson.person.name}
                        onChange={handlePersonChange}
                        id="name"
                    />

                </div>
                <div>
                    Number:
                    <input
                        value={newPerson.person.number}
                        onChange={handlePersonChange}
                        id="number"
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div id="personList">
                {console.log("showall:", showAll)}
                {showAll.map(person =>
                    <PersonDetail key={person.id} personDetail={person} />
                )}
            </div>
        </div>
    )
}

export default App

