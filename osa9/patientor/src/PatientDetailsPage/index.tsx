import React from "react";
import { useRouteMatch } from "react-router-dom";  
import axios from "axios";  
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";  
import { Container} from "semantic-ui-react";
// import { useStateValue } from "../state";
import { MatchParams } from "../types";
import { useStateValue } from "../state"; 

const PatientDetailsPage = () => { 
    const [{ patients }, dispatch] = useStateValue();

    React.useEffect(() => {
        void axios.get<void>(`${apiBaseUrl}/ping`); 
        const fetchPatientList = async () => {
          try {
            const { data: patientListFromApi } = await axios.get<Patient[]>(
              `${apiBaseUrl}/patients`
            );
            dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
          } catch (e) {
            console.error(e);
          }
        };
        void fetchPatientList();
      }, [dispatch]);
     
     
    const match : MatchParams | null = useRouteMatch('/patients/:id');  
    console.log('match id ', match?.params.id); 

    const patient : Patient | null | undefined = match 
    ? Object.values(patients).find((patient : Patient) => patient.id === match.params.id) 
    : null;

    console.log('patient ', patient);


  const GenderIcon = () => {
    switch(patient?.gender) {
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
        <div>ssn: {patient?.ssn}</div>
        <div>ssn: {patient?.dateOfBirth}</div>
        <div>ssn: {patient?.occupation}</div> 
      </Container> 
    </div>
  );
};

export default PatientDetailsPage;
