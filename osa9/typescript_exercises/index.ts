// import express, { json } from 'express'
// import { calculateBmi } from "./bmiCalculatorbmiCalculator";
import express from 'express'
import { calculateBmi } from './bmiCalculator';

const app = express();
 

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
});

app.get('/bmi', (_req, res) => {
    try {
        var height: number = Number(_req.query.height)
        var weight: number = Number(_req.query.weight)

        if (isNaN(height) || isNaN(weight)) 
        {
            res.json({ 'error': 'malformatted parameter(s)' }) 
        }

        // console.log('height/weight ', height, weight)

        let bmiCalculation = {
            weight: weight,
            height: height,
            bmi: calculateBmi(height, weight)
        }

        res.json(bmiCalculation)

    } catch (error) {
        // console.log('err ', error)
        res.json({ 'error': error }) 
    }
});
  

const PORT = 3002

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})