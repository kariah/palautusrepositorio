import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
 

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    try {
        const height = Number(_req.query.height);
        const weight = Number(_req.query.weight);

        if (isNaN(height) || isNaN(weight)) 
        {
            res.json({ 'error': 'malformatted parameter(s)' }); 
        }

        // console.log('height/weight ', height, weight)

        const bmiCalculation = {
            weight: weight,
            height: height,
            bmi: calculateBmi(height, weight)
        };

        res.json(bmiCalculation);

    } catch (error) { 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        res.json({ 'error': error });
    }
});
  

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});