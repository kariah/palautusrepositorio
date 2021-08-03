export interface Diagnose {
    code: string;
    name: string; 
    latin?: string;
  }

  export interface Patient {
    id: string;
    name: string; 
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
  } 
 
  export interface NonSensitivePatient {
    id: string;
    name: string; 
    dateOfBirth: string; 
    gender: string;
    occupation: string;
  } 
 