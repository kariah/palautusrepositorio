import express from 'express';
import patientService from '../services/patientService';
import cors from 'cors'; 
import { toNewPatient, toNewPatientEntry } from '../utils';

const router = express.Router();
const app = express();
app.use(cors());

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
  try {  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const newPatient = toNewPatient(_req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
 

router.post('/:id/entries', (_req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call 
        const newEntry = toNewPatientEntry(_req.body);  
        const patientId= _req.params.id;

        const patient = patientService.getPatient(_req.params.id); 
        if (!patient)
        {
          res.status(404).send('patient not found');
        }
        const addedEntry = patientService.addEntry(patientId, newEntry);
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get('/:id', (_req, res) => {
  try {  
     const patient = patientService.getPatient(_req.params.id); 
    res.json(patient);
     

  } catch (e) {
  //   res.status(400).send(e.message);
  }
});


export default router;