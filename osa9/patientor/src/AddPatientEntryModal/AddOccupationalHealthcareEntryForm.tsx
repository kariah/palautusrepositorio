import React from "react";
import { Grid, Button, Label } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "./FormField";
import { PatientEntryFormValues } from "../types";
import { useStateValue } from "../state";
import { isDate } from "../state/utils";

interface Props {
    onSubmit: (values: PatientEntryFormValues) => void;
    onCancel: () => void;
}

export const AddOccupationalHealthcareEntry = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: "OccupationalHealthcare",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                employerName: "",
                sickLeave: {
                    startDate: "",
                    endDate: ""
                }
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                // const errors: { [field: string]: string } = {};  
                const errors: {
                    description?: string;
                    date?: string,
                    specialist?: string,
                    diagnosisCodes?: [],
                    employerName?: string,
                    sickLeave?: {
                        startDate?:string,
                        endDate?: string
                    };
                } = {};  

                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date || !isDate(values.date)) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.employerName) {
                    errors.employerName = requiredError;
                } 
                if (!values.sickLeave.startDate || !isDate(values.sickLeave.startDate))
                {     
                    errors.sickLeave = {... errors.sickLeave}; 
                    errors.sickLeave.startDate = requiredError;
                }
                if (!values.sickLeave.endDate || !isDate(values.sickLeave.endDate)) { 
                    errors.sickLeave = {... errors.sickLeave}; 
                    errors.sickLeave.endDate = requiredError;
                } 

                console.log('errors ', errors);
                console.log('values ', values);
                
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Label style={{ "marginBottom": "10px" }} >Occupational Healthcare</Label>
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
                        <Field
                            label="Employer Name"
                            placeholder="Employer Name"
                            name="employerName"
                            component={TextField}
                        />
                        <Field
                            label="Sickleave: Start Date"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.startDate"  
                            component={TextField}
                        />
                        <Field
                            label="Sickleave: End Date"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.endDate"
                            component={TextField}
                        />
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
