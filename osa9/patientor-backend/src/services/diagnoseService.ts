import diagnoses from '../../data/diagnoses';
// import diagnoseData from '../../data/diagnoses';

import { Diagnose } from '../types';
 
const getEntries = () : Diagnose[] => {
  return diagnoses;
};


const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};