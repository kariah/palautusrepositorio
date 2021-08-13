import patients from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient, NewEntry } from '../types';
 

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


//const addEntry = (id: string, entry: NewEntry): Entry => {
const addEntry = (id: string, entry: NewEntry): NewEntry => {
    const newEntry = { 
        id: uuidv4(),
        ...entry
    };

    const patient = patients.find(patient => patient.id === id);
    patient?.entries.push(newEntry); 

    console.log('patient (with new entry)', patient); 
    console.log('newEntry ', newEntry);
     
    return newEntry; 
};


const getPatient = ( id: string ) : Patient | undefined => {
  return patients.find(patient => patient.id === id);
}; 
 

export default {
  getEntries, 
  getNonSensitiveEntries,
  addPatient,
    getPatient,
    addEntry 
};