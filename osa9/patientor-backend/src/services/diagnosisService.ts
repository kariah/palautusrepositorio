import diagnoses from '../../data/diagnoses'; 

import { Diagnosis } from '../types';
 
const getEntries = (): Diagnosis[] => {
  return diagnoses;
};


const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};