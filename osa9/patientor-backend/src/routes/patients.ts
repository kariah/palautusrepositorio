import express from 'express';   
import patientService from  '../services/patientService'; 
import cors from 'cors';

const router = express.Router();
const app = express();
app.use(cors());

app.use(function(_req, _res, next) {
  _res.header("Access-Control-Allow-Origin", "*");
  _res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', (_req, res) => {  
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;