import patients from '../../data/patients'; 

import { NonSensitivePatient, Patient } from '../types';
 
const getEntries = () : Patient[] => {
  return patients;
};

// const getNonSensitivePatients = (): NonSensitivePatient[] => {
//   return patients;
// };

const getNonSensitiveEntries = (): NonSensitivePatient [] => {
  return patients.map(({ id, name,  dateOfBirth, gender, occupation }) => ({
    id,
    name,  
    dateOfBirth, 
    gender, 
    occupation
  }));
};



const addEntry = () => {
  return null; 
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries
};