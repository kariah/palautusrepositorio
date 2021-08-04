import React from 'react';
import CoursePart from '../utils';


const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => (
    <>
        {courseParts.map(coursePart => <Course key={coursePart.name} coursePart={coursePart} />)}
    </>
);

const Course = ({ coursePart }: { coursePart: CoursePart }) => (
    <p>{coursePart.name}</p>
);

export default Content
