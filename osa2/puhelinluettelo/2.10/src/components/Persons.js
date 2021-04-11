import React from 'react'


const Person = ({ person }) => {
	return (
		<p>{person.name} {person.number}</p>
	)
}


const Persons = (props) => {
	const persons = props.persons

	return (

		<div>
			{console.log("persons:", persons)}
			{persons.map(person =>
				<Person key={person.id} person={person} />
			)}
		</div>
	)
}

export default Persons
