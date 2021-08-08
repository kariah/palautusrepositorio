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
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface Entry {
// } 
 
//Mallit
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare',
  employerName: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital',
  discharge: {
    date: string;
    criteria: string;
  };
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
} 

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;














  