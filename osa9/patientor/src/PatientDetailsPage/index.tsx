import React from "react";
import { useParams,//useRouteMatch 
} from "react-router-dom";

import axios from "axios";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { Container, Divider } from "semantic-ui-react";
// import { useStateValue } from "../state";
// import { MatchParams } from "../types";
import { useStateValue, setPatient } from "../state";
 
const PatientDetailsPage = () => {
    const [{ patients, patient }, dispatch] = useStateValue(); 
        
    // console.log("useStateValue (details): ", useStateValue());
    console.log('patient (state) ', patient);

    //Testailtu
    //const match: MatchParams | null = useRouteMatch('/patients/:id'); 
    //console.log('match id ', match?.params.id);
    
    // const patient: Patient | null | undefined = match
    //     ? Object.values(patients).find((patient: Patient) => patient.id === match.params.id)
    //     : null;

    const { id } = useParams<{ id: string }>();
    // console.log(' patient id ', id); 
    const patientFromUrl: Patient | null | undefined = Object.values(patients).find((patient: Patient) => patient.id === id); 
 
    React.useEffect(() => { 
        const fetchPatient = async () => {
          try {
            console.log('patient (state) -> fetch ', patient); 
            console.log('patientFromUrl -> fetch ', patientFromUrl);   
            const { data: patientFromApi } = await axios.get<Patient>(
              `${apiBaseUrl}/patients//${id}?`
            );
            // dispatch({ type: "SET_PATIENT", payload: patientFromApi });  
            //Muutettu tehtävässä 9.18 --> 

            dispatch(setPatient(patientFromApi));
          } catch (e) {
            console.error(e);
          }
        };
        
        if (patient === null || patientFromUrl?.id !== patient?.id)
        {
            void fetchPatient();
        } 
      }, [dispatch]);
 

    const GenderIcon = () => {
        switch (patient?.gender) {
            case 'female':
                return <i className="venus big icon"></i>;
            case 'male':
                return <i className="mars big icon"></i>;
            default:
                return <i className="genderless big icon"></i>;
        }
    };

    console.log('patient.entries ', patient?.entries);

    const PatientEntry = ({ entry }: { entry: Entry }) => ( 
      <>  
         {(() => { 
            switch(entry.type) {
              case "HealthCheck":  
                return <div></div>; 
              case "OccupationalHealthcare":  
                return <div></div>; 
              case "Hospital":  
                  return <div></div>; 
              default: 
                  return assertNever(entry);  
          }
          })()} 
      </>  
  );
   

  

    return (
        <div className="App">
            <Container textAlign="left">
                <h3>{patient?.name}<GenderIcon></GenderIcon></h3>
                <Divider></Divider> 
                <div>SSN: {patient?.ssn}</div>
                <div>Date of Birth: {patient?.dateOfBirth}</div>
                <div>Occupation: {patient?.occupation}</div>
                <Divider></Divider> 
                <div>
                  <h4>entries</h4>
                  <div>
                    {patient?.entries.map(entry =>
                      <div key={entry.id}>
                        {entry.date} {entry.description}
                        <div>
                          <ul>
                            {entry.diagnosisCodes?.map(c =>
                              <li key={c}>
                                {c}
                              </li>)}
                          </ul>
                        </div>
                        <PatientEntry entry={entry} />
                      </div>
                    )}
                  </div>
                </div>
            </Container>
        </div>
    );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default PatientDetailsPage;
