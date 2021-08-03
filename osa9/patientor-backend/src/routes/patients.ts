import express from 'express';   
import patientService from  '../services/patientService'; 
import cors from 'cors';
// import patients from '../../data/patients';

const router = express.Router();
const app = express();
app.use(cors());

router.get('/', (_req, res) => {  
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
  //res.send('Saving a patient!');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { name, dateOfBirth, ssn, gender, occupation } = _req.body;
  // const newPatient = patientService.addPatient()
  //   name,
  //   dateOfBirth,
  //   ssn,
  //   gender,
  //   occupation
  // );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const entry =  _req.body;
  const newPatient = patientService.addPatient(entry); 
  res.json(newPatient);
});

export default router;