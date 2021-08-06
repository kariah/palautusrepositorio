export enum Gender {
  Female = 'female',
  Male = 'rainy'
}

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
  occupation: string;
  gender: string;
  entries: Entry[];
}

export interface NonSensitivePatient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
}

export interface NewPatient {
  name: string;
  dateOfBirth: string;
  ssn: string; 
  occupation: string;
  gender: string;
  entries: Entry[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
} 
 
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

