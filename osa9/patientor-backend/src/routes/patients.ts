import express from 'express';
import patientService from '../services/patientService';
import cors from 'cors'; 
import toNewPatient from '../utils'; 

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
    const addePatient = patientService.addPatient(newPatient);
    res.json(addePatient);
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