import React from 'react';
import CoursePart from '../utils'; 
 
const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => ( 
    <> 
        {courseParts.map(coursePart => 
        <p key={coursePart.name}>
            <b>{coursePart.name} {coursePart.exerciseCount}</b>
            <Part coursePart={coursePart}  />
        </p> 
     )}
    </> 
); 

const Part = ({ coursePart }: { coursePart: CoursePart }) => ( 
    <> 
       {(() => { 
          switch(coursePart.type) {
            case "normal":  
                return <div>{coursePart.description}</div>;  
              case "groupProject":  
                 return <div>project exercises {coursePart.groupProjectCount}</div>;  
            case "submission":  
                return <div>submit to {coursePart.exerciseSubmissionLink}</div>;  
            case "special":  
                return <div>
                            <ul>
                            {coursePart.requirements.map(r => 
                                <li key={r}>
                                    {r}  
                                </li>)}
                            </ul>
                        </div>;
            default: 
                return assertNever(coursePart) 
                // const _exhaustiveCheck: never = coursePart.type;
                // return _exhaustiveCheck;
        }
        })()} 
    </>  
);
 
/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Content
