import { State } from "./state";
import { Patient, Diagnose } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST"; 
    payload: Patient[];
  }
  | {
    type: "SET_DIAGNOSES_LIST"; 
    payload: Diagnose[];
  }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  }
  | {
  type: "ADD_PATIENT";
  payload: Patient;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      // console.log('state', state);
      // console.log('test SET_PATIENT_LIST ', action.payload);

      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
     case "SET_DIAGNOSES_LIST":
        console.log('state', state);
        console.log('test SET_DIAGNOSES_LIST ', action.payload);
   
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
              {}
            ),
            ...state.diagnoses
          }
        };
    case "SET_PATIENT": 
      console.log('state', state);
      console.log('test SET_PATIENT', action.payload);

      //return [...state, action.data]  
      return {
        ...state, 
        patient: action.payload
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
}; 
 
export const setPatientList = (patients: Patient[]): Action => { 
    //Servicen kautta
    // return async dispatch => {
    //   const patients = await patientService.getAll();

    return { 
        type: "SET_PATIENT_LIST" as const, 
        payload: patients 
    }; 
  };
  
  export const addPatient = (newPatient: Patient): Action => { 
    return { 
        type: "ADD_PATIENT" as const, 
        payload: newPatient 
    }; 
  };

  export const setPatient = (patient: Patient): Action => { 
    return { 
        type: "SET_PATIENT" as const, 
        payload: patient 
    }; 
  };

  export const setDiagnosesList = (diagnoses: Diagnose[]): Action => {  
    return { 
        type: "SET_DIAGNOSES_LIST" as const, 
        payload: diagnoses 
    }; 
  };
  