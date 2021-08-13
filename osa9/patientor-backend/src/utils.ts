import { 
    NewPatient, 
    Gender, 
    Entry,
    NewEntry, 
    HealthCheckEntry,
    NewHealthCheckEntry,  
    OccupationalHealthcareEntry,
    NewOccupationalHealthcareEntry, 
    HospitalEntry,
    NewHospitalEntry,  
} from './types';

type Fields =  { name : unknown, ssn: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown };

const toNewPatient = ({  name, ssn, dateOfBirth, gender, occupation } : Fields): NewPatient => {

  const newPatient: NewPatient = {
    name: parseName(name),
        ssn: parseSsn(ssn),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: []
  };

  return newPatient;
};


//Toinen tapa
//eslint-disable-next-line @typescript-eslint/no-explicit-any
// const toNewPatient = (object: any): NewPatient => {

//     console.log('object ', object);

//     const newPatient: NewPatient = {
//         name: parseName(object.name),
//         ssn: parseSsn(object.ssn),
//         dateOfBirth: parseDateOfBirth(object.dateOfBirth),
//         gender: parseGender(object.gender),
//         occupation: parseOccupation(object.occupation), 
//     };

//     return newPatient;
// };
 

const toNewPatientEntry = (entry: Entry): NewEntry => {  

    // console.log('type ', parseType(entry.type)); 

    switch (entry.type) {
        case 'HealthCheck': 
            return toNewHealthCheckEntry(entry); 
        case 'OccupationalHealthcare': 
            return toNewOccupationalHealthcareEntry(entry);
        case 'Hospital': 
            return toNewHospitalEntry(entry);
        default:  
            return assertNever(entry);
      }  
}; 

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };


//Voisi mennä myös tällä tavalla
// const toNewHealthCheckEntry = (entry: HealthCheckEntry): NewHealthCheckEntry => { 
//     entry.healthCheckRating = ParseHealthCheckRating ..
//     return entry; 
// };  
const toNewHealthCheckEntry = (entry: HealthCheckEntry): NewHealthCheckEntry => {
       
     const newHealthHealthCheckEntry: NewEntry = { 
        type: "HealthCheck", 
        healthCheckRating: entry.healthCheckRating,

        //Base
        date: parseEntryDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
        description: parseDescription(entry.description),  
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes)  
    };
    return newHealthHealthCheckEntry;
}; 

const toNewOccupationalHealthcareEntry = (entry: OccupationalHealthcareEntry): NewOccupationalHealthcareEntry => {   
    const newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry = { 
        type: "OccupationalHealthcare",
        employerName: parseEmployerName(entry.employerName),
        sickLeave: parseSickLeave(entry.sickLeave),

        //Base
        date: parseEntryDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
        description: parseDescription(entry.description),   
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes)
    };

    return newOccupationalHealthcareEntry;
};
 
const toNewHospitalEntry = (entry: HospitalEntry): NewHospitalEntry => {  
    const newHospitalEntry: NewHospitalEntry = { 
        type: "Hospital", 
        discharge: parseDischarge(entry.discharge),
        
        //Base
        date: parseEntryDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
        description: parseDescription(entry.description),
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes)  
    };
    return newHospitalEntry;
};
 

//Patient parsing
const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const parseSsn = (ssn: unknown): string => { 
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error('Incorrect or missing ssn');
    } 
    return ssn;
};

const isSsn = (ssn: string): boolean => {
    let isValid = ssn.includes('-');
 
    if (isValid)
    {
        isValid = ssn.length === 11? true : false;
    }

    //TODO: ja lisää muuta tarkistusta ..
    return isValid;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const isGender = (str: string): str is Gender => {
    return ['female', 'male'].includes(str);
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    console.log('date ', Date.parse(date));

    return Boolean(Date.parse(date));
};
  

//Entry parsing
// const parseType = (type: unknown): string => {
//     if (!type || !isString(type)) {
//         throw new Error('Incorrect or missing type');
//     }
//     return type;
// };

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};

const parseEntryDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing entry date: ' + date);
    }
    return date;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
}; 

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employerName');
    }
    return employerName;
};

const parseSickLeave = (sickLeave: {
    startDate: string;
    endDate: string;
    }): {
        startDate: string;
        endDate: string;
    } => {
    if ( !isString(sickLeave.startDate) || !isString(sickLeave.endDate)) {
        throw new Error('Incorrect or missing sickLeave');
    }
    return sickLeave;
};

const parseDischarge = (discharge: {
    date: string;
    criteria: string;
    }): {
        date: string;
        criteria: string;
    } => {
    if ( !isString(discharge.date) || !isString(discharge.criteria)) {
        throw new Error('Incorrect or missing sickLeave');
    }
    return discharge;
};

const parseDiagnosisCodes = (diagnosisCodes?: string[]): string[] | undefined => {
    if (diagnosisCodes && !Array.isArray(diagnosisCodes)) {
        throw new Error('Incorrect or missing diagnosisCodes');
    }
    return diagnosisCodes;
};

export {
    toNewPatient,
    toNewPatientEntry
};
