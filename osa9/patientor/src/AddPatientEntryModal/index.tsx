import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddPatientForm, { PatientEntryFormValues } from './AddPatientEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientEntryFormValues) => void;
  error?: string;
}

const AddPatientEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddPatientEntryModal;
