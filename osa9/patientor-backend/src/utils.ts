import { NewPatient, Gender } from './types';

type Fields =  { name : unknown, ssn: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown };

const toNewPatient = ({  name, ssn, dateOfBirth, gender, occupation } : Fields): NewPatient => {

  const newPatient: NewPatient = {
    name: parseName(name),
        ssn: parseSsn(ssn),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
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
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
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
    return Boolean(Date.parse(date));
};


export default toNewPatient;
