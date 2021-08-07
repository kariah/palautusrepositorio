import React from "react";
import { useParams,//useRouteMatch 
} from "react-router-dom";

import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Container } from "semantic-ui-react";
// import { useStateValue } from "../state";
// import { MatchParams } from "../types";
import { useStateValue } from "../state";

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

    // console.log('patientFromUrl ', patientFromUrl);  

    React.useEffect(() => { 
        const fetchPatient = async () => {
          try {
            console.log('patient (state) -> fetch ', patient); 
            console.log('patientFromUrl -> fetch ', patientFromUrl);   
            const { data: patientFromApi } = await axios.get<Patient>(
              `${apiBaseUrl}/patients//${id}?`
            );
            dispatch({ type: "SET_PATIENT", payload: patientFromApi });
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

    return (
        <div className="App">
            <Container textAlign="center">
                <h3>{patient?.name}<GenderIcon></GenderIcon></h3>
                <div>SSN: {patient?.ssn}</div>
                <div>Date of Birth: {patient?.dateOfBirth}</div>
                <div>Occupation: {patient?.occupation}</div>
            </Container>
        </div>
    );
};

export default PatientDetailsPage;
