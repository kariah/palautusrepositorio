export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
} 

export interface MatchParams {
   params: { id: string };
}
  
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


export type PatientEntryFormValues = Omit<Entry, "id" | "type">;

// export interface PatientEntryProps {
//     onSubmit: (values: PatientEntryFormValues) => void;
//     onCancel: () => void;
// }

// export interface PatientEntryProps {
//   modalOpen: boolean;
//   onClose: () => void;
//   onSubmit: (values: PatientEntryFormValues) => void;
//   error?: string;
//   type: string; 
// }
