// Malli
// type Operation = 'multiply' | 'add' | 'divide';
 
interface ExcerciseCalculationResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: string,
    ratingDescription: string,
    target: number,
    average: number
  }
  

// type Result = TrainingResult

const calculateExercises  = (excerciseHoursInWeek:number[], target: number) : ExcerciseCalculationResult => { 
     console.log(excerciseHoursInWeek)

     const sumOfTrainingHours =  excerciseHoursInWeek.reduce((a, b) => a + b, 0)
     const trainingDays = excerciseHoursInWeek.filter(x => x > 0).length

     console.log('sumOfTrainingHours ', sumOfTrainingHours)

     let exerciseCalculationResult = {
        periodLength: excerciseHoursInWeek.length,
        trainingDays:  trainingDays,
        success: false,
        rating: "ok",
        ratingDescription: "ok2",
        target: 1,
        average: sumOfTrainingHours / trainingDays
      }

//   switch(op) {
//     case 'multiply':
//       return a * b;
//     case 'divide':
//       if( b === 0) throw new Error('Can\'t divide by 0!');
//       return a / b;
//     case 'add':
//       return a + b;
//     default:
//       throw new Error('Operation is not multiply, add or divide!');
//   }
        return exerciseCalculationResult
}

try { 
  const excerciseHoursInWeek:number[] = new Array(3, 0, 2, 4.5, 0, 3, 1)

  console.log(calculateExercises(excerciseHoursInWeek, 2))
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}


// type Operation = 'multiply' | 'add' | 'divide';

// type Result = string;