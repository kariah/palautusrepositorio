import React from 'react'


const Header = (props) => {
    return (
        <div>
            <p>{props.course}</p>
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

const Total = ({ parts }) => {
    const sumOfExercises = parts.reduce(
        (prevValue, currentValue) => prevValue + currentValue.exercises,
        0
    );
    return <p>Number of exercises: {sumOfExercises}</p>;
};

const App = () => {
    const course = 'Half Stack application development'

    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]

    return (
        <>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </>
    )
}

export default App
