import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
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
