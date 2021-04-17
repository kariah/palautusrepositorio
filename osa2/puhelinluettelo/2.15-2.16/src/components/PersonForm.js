import React, { useState } from 'react'
import personService from '../services/persons'


const PersonForm = (props) => {
    const persons = props.persons
    const setPersons = props.setPersons
    const setShowAll = props.setShowAll

    const [newPerson, setNewPerson] = useState({
        person: {
            id: 0,
            name: "",
            number: ""
        }
    });

    const addPerson = (event) => {
        event.preventDefault()

        if (newPerson.person.name !== undefined) {
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

        //console.log(personObject)

        //add to server db
        personService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setShowAll(persons.concat(returnedPerson))
                setNewPerson({
                    person: {
                        id: 0,
                        name: "",
                        number: ""
                    }
                })
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

    return (
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
    )
}

export default PersonForm