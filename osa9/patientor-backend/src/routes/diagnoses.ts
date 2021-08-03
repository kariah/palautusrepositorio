import express from 'express';   
import diagnoseService from  '../services/diagnoseService';
import cors from 'cors';

const router = express.Router();
const app = express();
app.use(cors());

router.get('/', (_req, res) => {

  // res.send('Fetching all diagnoses!');
  res.send(diagnoseService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;