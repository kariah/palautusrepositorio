import React from 'react'
import personService from '../services/persons'


const Persons = (props) => {
    const showAll = props.showAll
    const persons = props.persons
    const setPersons = props.setPersons
    const setShowAll = props.setShowAll


    const removePerson = (id) => {  
        personService
            .remove(id)
            .then(response => { 
                console.log("response ", response) 

                let filtered = showAll.filter(person => person.id !== id) 
                setShowAll(filtered)

                filtered = persons.filter(person => person.id !== id)
                setPersons(filtered) 
            })  

         
    } 
   
     
    return (
        <div>
            {showAll.map(person => 
                <p key={person.id}>{person.name} {person.number}
                    <button onClick={() =>
                        window.confirm(`Delete ${person.name}?`) &&
                        removePerson(person.id)}>Delete</button>
                </p>)}
        </div>
    )
} 

export default Persons
