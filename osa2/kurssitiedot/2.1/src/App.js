import React from 'react'


const Course = (props) => {
    const name = props.course.name
    const parts = props.course.parts

    console.log('%cApp.js object', 'color: #007acc;', parts);

    return (  
        <div> 
            <Header name={name} />
            <Content parts={parts} />
        </div>
    )
}


const Header = (props) => {
    return (
        <div>
            <h1> {props.name}</h1>
        </div>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.name} part={part} />)}
        </div>
    )
}

const Part = ({ part }) => (
    <p>{part.name} {part.exercises}</p>
)
 
const App = () => { 
  
    const course = {
        name: 'Half Stack application development',
        id: 1,
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }
  

    return (
        <div>
            <Course course={course} />
        </div>
    ) 
}

export default App
