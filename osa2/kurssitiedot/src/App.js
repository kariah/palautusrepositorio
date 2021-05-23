import React from 'react'
import Courses from './components/Courses'

//const Courses = (props) => {
//    const courses = props.courses
//    //const parts = props.course.parts 

//    console.log(courses)

//    return (
//        <div>
//            <div>
//                {courses.map(course => <Course key={course.id} course={course} />)}
//            </div> 
//        </div>
//    )
//}


//const Course = (props) => {
//    const name = props.course.name
//    const parts = props.course.parts 

//    return (  
//        <div> 
//            <Header name={name} />
//            <Content parts={parts} />
//            <Total parts={parts} />
//        </div>
//    )
//}


//const Header = (props) => {
//    return (
//        <div>
//            <h1> {props.name}</h1>
//        </div>
//    )
//}

//const Content = ({ parts }) => {
//    return (
//        <div>
//            {parts.map(part => <Part key={part.id} part={part} />)}
//        </div>
//    )
//}

//const Part = ({ part }) => (
//    <p>{part.name} {part.exercises}</p>
//)


//const Total = ({ parts }) => { 
//    const sum = parts.map(part => part.exercises).reduce((sum, val) => sum + val, 0); 
//    return <p><b>total of exercises: {sum}</b></p>;
//};


 
const App = () => {  
    const courses = [
        {
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
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

     

    return (
        <div>
            <Courses courses={courses} /> 
        </div>
    ) 
}

export default App
