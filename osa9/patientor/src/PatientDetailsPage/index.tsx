import React from "react";
import { useRouteMatch } from "react-router-dom";
// import { MatchParams } from "../types";

// import { BrowserRouter as Router, Route, Link, Switch, useRouteMatch  } from "react-router-dom";

// import axios from "axios";
// // import { Container, Table, Button } from "semantic-ui-react";

// // import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
// // import AddPatientModal from "../AddPatientModal";
// import { Patient } from "../types";
// import { apiBaseUrl } from "../constants";
// import HealthRatingBar from "../components/HealthRatingBar";

import { Container} from "semantic-ui-react";
// import { useStateValue } from "../state";
import { MatchParams } from "../types";
// import { useStateValue } from "../state"; 

const PatientDetailsPage = () => {

    // const [pantients, dispatch] = useStateValue();

    // const[{patients, dispatch]}] = useStateValue()];

//   const [{ patients }, dispatch] = useStateValue();

//   const [modalOpen, setModalOpen] = React.useState<boolean>(false);
//   const [error, setError] = React.useState<string | undefined>();

//   const openModal = (): void => setModalOpen(true);

//   const closeModal = (): void => {
//     setModalOpen(false);
//     setError(undefined);
//   };
 
//   const submitNewPatient = async (values: PatientFormValues) => {
//     try {
//       const { data: newPatient } = await axios.post<Patient>(
//         `${apiBaseUrl}/patients`,
//         values
//       );
//       dispatch({ type: "ADD_PATIENT", payload: newPatient });
//       closeModal();
//     } catch (e) {
//       console.error(e.response?.data || 'Unknown Error');
//       setError(e.response?.data?.error || 'Unknown error');
//     }
//   };


    //const match = new useRouteMatch('/patients/:id')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const match = new useRouteMatch<MatchParams>('/patients/:id');
    // const match = new useRouteMatch<MatchParams>(); 
    // console.log('match ', match);

    // let { path, url } = new useRouteMatch();
    
    // const match = new useRouteMatch<MatchParams>();

    // const { MatchParams: id } =  new useRouteMatch<MatchParams>('/patients/:id');
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { id } = new useRouteMatch());
    
    // let match = useRouteMatch("/blog/:slug");
    // // const anecdote = match 
    // //     ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id)) 
    // //     : null  

    const match : MatchParams | null = useRouteMatch('/patients/:id');  
    console.log('match id ', match?.params.id); 

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient details</h3>
      </Container>
      {/* <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Occupation</Table.HeaderCell>
            <Table.HeaderCell>Health Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(patients).map((patient: Patient) => (
            <Table.Row key={patient.id}>
              <Table.Cell><a onClick={() => alert('hep')}>{patient.name}</a></Table.Cell>
              <Table.Cell>{patient.gender}</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
              <Table.Cell>
                <HealthRatingBar showText={false} rating={1} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button> */}
    </div>
  );
};

export default PatientDetailsPage;
