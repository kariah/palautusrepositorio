import React from "react";
import {
  useParams,//useRouteMatch 
} from "react-router-dom";

import axios from "axios";
import { Patient, Entry, Diagnose, HealthCheckRating } from "../types";
import { apiBaseUrl } from "../constants";
import { Container, Divider, Card } from "semantic-ui-react";
// import { useStateValue } from "../state";
// import { MatchParams } from "../types";
import { useStateValue, setPatient, setDiagnosesList } from "../state";

const PatientDetailsPage = () => {
  const [{ patients, patient, diagnoses }, dispatch] = useStateValue();

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

        const { data: diagnosesFromApi } = await axios.get<Array<Diagnose>>(
          `${apiBaseUrl}/diagnoses/`
        );
        // dispatch({ type: "SET_PATIENT", payload: patientFromApi });  
        //Muutettu tehtävässä 9.18 --> 

        console.log('diagnosesFromApi ', diagnosesFromApi);

        dispatch(setPatient(patientFromApi));
        dispatch(setDiagnosesList(diagnosesFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (patient === null || patientFromUrl?.id !== patient?.id) {
      void fetchPatient();
    }
  }, [dispatch]); 
 
  const DiagnosesList = ({ diagnosisCodes }: { diagnosisCodes?: string[] | undefined }) => ( 
    <>
      {
        console.log('diagnoseCodes ', diagnosisCodes)
      } 
      <div>
      <ul>
      {diagnosisCodes?.map((code: string) => (
        <li key={code}>
           {code} {diagnoses[code]?.name}  
        </li>
      ))}
      </ul>
      </div>
    </>
  );
 
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

  const EntryIcon = ({ entryType }: { entryType: string }) => {
    switch (entryType) {
      case 'HealthCheck':
        return <i className="stethoscope big icon"></i>;
      case 'OccupationalHealthcare':
        return <i className="user md big icon"></i>;
      case 'Hospital':
        return <i className="hospital outline big icon"></i>;
      default:
        return <i className="genderless big icon"></i>;
    }
  };

  const HealthCheckRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return <i className="heart small green icon"></i>;
      case HealthCheckRating.LowRisk:
        return <i className="heart small yellow icon"></i>;
      case HealthCheckRating.HighRisk:
        return <i className="heart small blue icon"></i>;
      case HealthCheckRating.CriticalRisk:
          return <i className="heart small red icon"></i>;
      default:
        return <></>;
    }
  };

  //console.log('patient.entries ', patient?.entries); 
   
  const EntryDetails = ({ entry }: { entry: Entry }) => (
    <>
      {(() => {
        switch (entry.type) {
          case "HealthCheck":
            return <div><HealthCheckRatingIcon rating={entry.healthCheckRating}></HealthCheckRatingIcon></div>;
          case "OccupationalHealthcare":
            return <div>
                <div>employername: {entry.employerName}</div>
                <div>sickleave start: {entry.sickLeave.startDate} - end: {entry.sickLeave.endDate}</div>
            </div>;
          case "Hospital":
            return <div>
             <div>discharge date: {entry.discharge.date} - start: {entry.discharge.criteria}</div>
             </div>;
          default:
            return assertNever(entry);
        }
      })()}
      <DiagnosesList diagnosisCodes={entry.diagnosisCodes}></DiagnosesList> 
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
        <Container textAlign="left">
          <h4>entries</h4>
          {patient?.entries.map(entry =>
            <Card key={entry.id} fluid>
              <Card.Content>
                <div>
                  <b>{entry.date}</b><EntryIcon entryType={entry.type}></EntryIcon>
                </div>
                <div>
                  <i>{entry.description}</i>
                </div> 
                <div>
                  <EntryDetails entry={entry} />
                </div>
              </Card.Content>
            </Card>
          )}
        </Container>
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
