import patients from '../../data/patients';  
import { NonSensitivePatient, Patient, NewPatient } from '../types';
 

import { v4 as uuidv4 } from 'uuid';
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const getEntries = () : Patient[] => {
  return patients;
};
 
const getNonSensitiveEntries = (): NonSensitivePatient [] => {
  return patients.map(({ id, name,  dateOfBirth, gender, occupation }) => ({
    id,
    name,  
    dateOfBirth, 
    gender, 
    occupation
  }));
}; 

const addPatient = ( entry: NewPatient ): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...entry
  };

  console.log('newPatient ', newPatient);

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries, 
  getNonSensitiveEntries,
  addPatient
};