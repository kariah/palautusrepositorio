import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());


interface ExerciseCalculationValues 
{
    daily_exercises: [],
    target: number
}

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
  

app.post('/calculateexercises', (_req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const body = _req.body; 
                
        if (!body)  
        {
            res.json({ 'error': 'parameters missing' }); 
        }  
        
        const exerciseCalculationValues = body as ExerciseCalculationValues;
        if (!exerciseCalculationValues.target || !exerciseCalculationValues.daily_exercises)  
        {
            res.json({ 'error': 'malformatted parameter(s)' }); 
        }  

        // console.log(calculateExercises(
        //     exerciseCalculationValues.target,
        //     exerciseCalculationValues.daily_exercises));

        res.json(calculateExercises(
                exerciseCalculationValues.target,
                exerciseCalculationValues.daily_exercises));  
    } catch (error) { 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        res.json({ 'error': error });
    }
});
  


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});