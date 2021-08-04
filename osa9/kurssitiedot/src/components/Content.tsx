import React from 'react';
import CoursePart from '../utils'; 
 
const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => ( 
    <> 
        {courseParts.map(coursePart => 
        <Part key={coursePart.name} coursePart={coursePart}  />)}
    </> 
);

const Part = ({ coursePart }: { coursePart: CoursePart }) => ( 
    <> 
       {(() => { 
          switch(coursePart.type) {
             case "normal":  
                return <div><b>{coursePart.name}</b>
                        <div>
                            <p>{coursePart.exerciseCount}</p> 
                        </div>
                        <div>
                            <p>{coursePart.description}</p> 
                        </div>
                        </div> ;
              case "groupProject":  
              return <div><b>{coursePart.name}</b>
                      <div>
                          <p>{coursePart.exerciseCount}</p> 
                      </div>
                      <div>
                          {/* <p>{coursePart.description}</p>  */}
                      </div>
                      </div> ; 
            case "submission":  
            return <div><b>{coursePart.name}</b>
                    <div>
                        <p>{coursePart.exerciseCount}</p> 
                    </div>
                    <div>
                        <p>{coursePart.description}</p> 
                    </div>
                    </div> ;
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
