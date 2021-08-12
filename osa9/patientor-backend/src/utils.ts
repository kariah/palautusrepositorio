import { 
    NewPatient, 
    Gender, 
    // Entry,
    NewEntry,
    NewHealthCheckEntry,  
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

// type PatientEntryFields =  { type: unknown, description: unknown };

const toNewPatientEntry = (entry: NewEntry): NewEntry => { 
//const toNewPatientEntry = (entry: NewHealthCheckEntry): NewHealthCheckEntry => { 

    console.log('type ', parseType(entry.type));

    // const newHealthHealthCheckEntry: NewEntry = { 
    //     return toNewHealthHealthCheckEntry(entry);
    // };
    // return newHealthHealthCheckEntry;


    //return toNewHealthCheckEntry(entry);
    
    switch (parseType(entry.type)) {
        case 'HealthCheck': 
            return toNewHealthHealthCheckEntry(entry);
            // const newHealthHealthCheckEntry: NewEntry = { 
            //     type: "HealthCheck", 
            //     description: parseDescription(description) 
            // };
            // return newHealthHealthCheckEntry;
        // case 'OccupationalHealthcare': 
        // case 'Hospital': 
        default:  
          //TODO: assert
          return toNewHealthHealthCheckEntry(entry);
      }  
};


const toNewHealthHealthCheckEntry = (entry: NewHealthCheckEntry): NewHealthCheckEntry => { 
 
    const newHealthHealthCheckEntry: NewEntry = { 
        type: "HealthCheck",
        description: parseDescription(entry.description) 
    };
    return newHealthHealthCheckEntry;
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
const parseType = (type: unknown): string => {
    if (!type || !isString(type)) {
        throw new Error('Incorrect or missing type');
    }
    return type;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};


export {
    toNewPatient,
    toNewPatientEntry
};
