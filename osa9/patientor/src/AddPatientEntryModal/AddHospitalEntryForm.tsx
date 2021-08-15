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

export const AddHospitalEntry = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: "Hospital",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                discharge: {
                    date: "",
                    criteria: ""
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
                    discharge?: {
                        date?:string,
                        criteria?: string
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
                if (!values.discharge.date || !isDate(values.discharge.date)) {
                    errors.discharge = {... errors.discharge}; 
                    errors.discharge.date = requiredError;
                }
                if (!values.discharge.criteria) {
                    errors.discharge = {... errors.discharge}; 
                    errors.discharge.criteria = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Label style={{ "marginBottom": "10px" }} >Hospital entry</Label>
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
                            label="Discharge: Date"
                            placeholder="YYYY-MM-DD"
                            name="discharge.date"
                            component={TextField}
                        />
                        <Field
                            label="Discharge: Criteria"
                            placeholder="Criteria"
                            name="discharge.criteria"
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

export default AddHospitalEntry;
