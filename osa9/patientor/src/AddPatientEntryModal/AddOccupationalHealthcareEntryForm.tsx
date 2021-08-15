import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik"; 
import { TextField, 
  //SelectField, HealthCheckRatingOption, 
  DiagnosisSelection } from "./FormField";
import { 
  //HealthCheckRating, 
  Entry } from "../types";
import { useStateValue  } from "../state";
import { isDate } from "../state/utils";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type PatientEntryFormValues = Omit<Entry, "id" | "type">;

interface Props {
  onSubmit: (values: PatientEntryFormValues) => void;
  onCancel: () => void;
}

// const healthCheckRatingOptions: HealthCheckRatingOption[] = [
//   { value: HealthCheckRating.Healthy, label: "Healthy" },
//   { value: HealthCheckRating.LowRisk, label: "Low Risk" },
//   { value: HealthCheckRating.HighRisk, label: "High Risk" },
//   { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
// ];
 
export const AddOccupationalHealthcareEntry = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnoses }] = useStateValue();

  return ( 
    <Formik 
      initialValues={{ 
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "", 
        diagnosisCodes: [],
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date || !isDate(values.date)) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        } 
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <h3>Occupational Healthcare</h3>
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />  
            {/* <SelectField
              label="Health Check Rating"
              name="healthCheckRating"
              options={healthCheckRatingOptions}
            /> */}
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
            />     
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOccupationalHealthcareEntry;
