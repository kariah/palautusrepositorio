import React from 'react'

// const Courses = (props) => {
//     const courses = props.courses

//     return (
//         <div>
//             <div>
//                  {courses.map(course => <Course key={course.id} course={course} />)} 
//             </div>
//         </div>
//     )
// }


// const Course = (props) => {
//     const name = props.course.name
//     const parts = props.course.parts

//     return (
//         <div>
//             <Header name={name} />
//             <Content parts={parts} />
//             <Total parts={parts} />
//         </div>
//     )
// }
 
const Header = ({ name }: { name: string }) => (
    <h1>{name}</h1>
 );

// const Content = ({ parts }) => {
//     return (
//         <div>
//             {parts.map(part => <Part key={part.id} part={part} />)}
//         </div>
//     )
// }

// const Part = ({ part }) => (
//     <p>{part.name} {part.exercises}</p>
// )


// const Total = ({ parts }) => {
//     const sum = parts.map(part => part.exercises).reduce((sum, val) => sum + val, 0);
//     return <p><b>total of exercises: {sum}</b></p>
// }

export default Header