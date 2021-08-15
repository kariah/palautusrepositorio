import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHealthCheckEntryForm
 //{ PatientEntryFormValues } 
 from './AddHealthCheckEntryForm';
import AddOccupationalHealthcareEntryForm from "./AddOccupationalHealthcareEntryForm";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import { PatientEntryFormValues } from "../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientEntryFormValues) => void;
  error?: string;
  type: string; 
}


interface PropsToForm { 
  type: string;
  onClose: () => void;
  onSubmit: (values: PatientEntryFormValues) => void; 
}
 

const AddPatientEntryModal = ({ modalOpen, onClose, onSubmit, error, type }: Props) => ( 
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>} 
      <AddEntryForm type={type} onClose={onClose} onSubmit={onSubmit} />
    </Modal.Content>
  </Modal>
);  

const AddEntryForm = ({ type, onClose, onSubmit }: PropsToForm) => {   
  // console.log('type ', type); 
  switch (type) {
    case 'HealthCheck': 
      return (
        <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />);
    case 'OccupationalHealthcare': 
      return (
       <AddOccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />);
    case 'Hospital': 
      return (
        <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />);
    default:  
        return <div>Form not found</div>;
  }   
};

export default AddPatientEntryModal;
