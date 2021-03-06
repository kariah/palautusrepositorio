import React from "react";
import {
  useParams,//useRouteMatch 
} from "react-router-dom";

import axios from "axios";
import { Patient, Entry, Diagnose, PatientEntryFormValues } from "../types";
import { apiBaseUrl } from "../constants";
import { Container, Divider, Card, Button } from "semantic-ui-react";
import {
  useStateValue,
  setPatient,
  setDiagnosesList,
} from "../state";
// import { PatientEntryFormValues } from "../AddPatientEntryModal/AddHealthCheckEntryForm";
import HealthCheckRatingIcon from "../components/HealthCheckRatingIcon";
import EntryIcon from "../components/EntryIcon";
import AddHealthCheckEntryForm from "../AddPatientEntryModal";
import AddOccupationalHealthcareEntryForm from "../AddPatientEntryModal";
import AddHospitalEntryForm from "../AddPatientEntryModal";
import GenderIcon from "../components/GenderIcon"; 

const PatientDetailsPage = () => {
  const [{ patients, patient, diagnoses }, dispatch] = useStateValue();
  // console.log('patient (state) ', patient);

  //Testailtu
  //const match: MatchParams | null = useRouteMatch('/patients/:id'); 
  //console.log('match id ', match?.params.id);

  // const patient: Patient | null | undefined = match
  //     ? Object.values(patients).find((patient: Patient) => patient.id === match.params.id)
  //     : null;

  const { id } = useParams<{ id: string }>();
  //const patientByParameter: Patient | null | undefined = Object.values(patients).find((patient: Patient) => patient.id === id);
  const paramPatient = patients[id];

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        console.log('paramPatient -> fetch ', paramPatient);

        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients//${id}?`
        );

        const { data: diagnosesFromApi } = await axios.get<Array<Diagnose>>(
          `${apiBaseUrl}/diagnoses/`
        );
        dispatch(setPatient(patientFromApi));
        dispatch(setDiagnosesList(diagnosesFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (patient === null || paramPatient?.id !== patient?.id) {
      void fetchPatient();
    }
  }, [dispatch]);

  const DiagnosesList = ({ diagnosisCodes }: { diagnosisCodes?: string[] | undefined }) => (
    <>
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
 
  const [modalHealthCheckOpen, setModalHealthCheckOpen] = React.useState<boolean>(false);
  const [modalOccupationalHealthcareOpen, setModalOccupationalHealthcareOpen] = React.useState<boolean>(false);
  const [modalHospitalOpen, setModalHospitalOpen] = React.useState<boolean>(false); 
  const [error, setError] = React.useState<string | undefined>();
  
  const openModal = (type: string): void => { 
    switch (type) {
      case 'HealthCheck': 
        setModalHealthCheckOpen(true);
        setModalOccupationalHealthcareOpen(false);
        setModalHospitalOpen(false);
        return;
      case 'OccupationalHealthcare': 
        setModalHealthCheckOpen(false);
        setModalOccupationalHealthcareOpen(true);
        setModalHospitalOpen(false);
        return;
      case 'Hospital': 
        setModalHealthCheckOpen(false);
        setModalOccupationalHealthcareOpen(false);
        setModalHospitalOpen(true);
        return;
      default:  
        setModalHealthCheckOpen(false);
        setModalOccupationalHealthcareOpen(false);
        setModalHospitalOpen(false);
    }  
  }; 

  const closeModal = (): void => {
    // setModalOpen(false);
    setModalHealthCheckOpen(false);
    setModalOccupationalHealthcareOpen(false);
    setModalHospitalOpen(false);
    setError(undefined);
  }; 
 
  function submitNewPatientEntry(patient: Patient | null | undefined) {
    return async (values: PatientEntryFormValues) => {

      try {
        //http://localhost:3001/api/patients/d2773c6e-f723-11e9-8f0b-362b9e155667/entries
        const { data: newPatientEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );

        patient?.entries.push(newPatientEntry);

        closeModal();
      } catch (e) {
        console.error(e.response?.data || 'Unknown Error');
        setError(e.response?.data?.error || 'Unknown error');
      }
    };
  }
 
  return (
    <div className="App">
      <Container textAlign="left">
        <h3>{patient?.name}<GenderIcon gender={patient?.gender}></GenderIcon></h3>
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
      <AddHealthCheckEntryForm
        modalOpen={modalHealthCheckOpen}
        onSubmit={submitNewPatientEntry(patient)}
        error={error}
        onClose={closeModal}
        type="HealthCheck"
      /> 
      <AddOccupationalHealthcareEntryForm
        modalOpen={modalOccupationalHealthcareOpen}
        onSubmit={submitNewPatientEntry(patient)}
        error={error}
        onClose={closeModal}
        type="OccupationalHealthcare"
      /> 
      <AddHospitalEntryForm
        modalOpen={modalHospitalOpen}
        onSubmit={submitNewPatientEntry(patient)}
        error={error}
        onClose={closeModal}
        type="Hospital"
      />  

      <div>
        <Button style={{
          "marginTop": "20px"
        }} onClick={() => openModal("HealthCheck")}>Add New Health Check Entry</Button>
       
        <Button style={{
          "marginTop": "20px"
        }} onClick={() => openModal("OccupationalHealthcare")}>Add New Occupational Healthcare Entry</Button>
        
        <Button style={{
          "marginTop": "20px"
        }} onClick={() => openModal("Hospital")}>Add New Hospital Entry</Button>

      </div>
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default PatientDetailsPage;
