interface ExcerciseCalculationResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
  } 

const calculateExercises  = (excerciseHoursInWeek:number[], target: number) : ExcerciseCalculationResult => { 
     const sumOfTrainingHours =  excerciseHoursInWeek.reduce((a, b) => a + b, 0)
     const trainingDays = excerciseHoursInWeek.filter(x => x > 0).length

     let averageTrainingHours = 0
     if (trainingDays > 0)
     {
        averageTrainingHours = sumOfTrainingHours / trainingDays
    }
    else
    {
        averageTrainingHours = 0
    }

     let rating = 0
     let ratingDescription = 'Not enough exercises!'  
     let averageTrainingHoursComparedToTarget = averageTrainingHours - target  
     
    //  console.log('excerciseHoursInWeek ', excerciseHoursInWeek) 
    //  console.log('averageTrainingHours ', averageTrainingHours) 
    //  console.log('averageTrainingHoursComparedToTarget ', averageTrainingHoursComparedToTarget) 

      if (averageTrainingHoursComparedToTarget < 0)
      {
        rating = 1,
        ratingDescription = "Below target, could be better" 
      } 
      else if (averageTrainingHoursComparedToTarget >= 0 && averageTrainingHoursComparedToTarget < 1)
      {
        rating = 2,
        ratingDescription = "Target or over the target, well done!" 
      } 
      else if (averageTrainingHoursComparedToTarget >= 1)
      {
        rating = 3 
        ratingDescription = "A lot over the target, excellent!"
      }  
 

      let exerciseCalculationResult = {
        periodLength: excerciseHoursInWeek.length,
        trainingDays:  trainingDays,
        success: false,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: averageTrainingHours
      }  
 
    return exerciseCalculationResult
}

try { 
  const excerciseHoursInWeek:number[] = new Array(3, 0, 2, 4.5, 0, 3, 1)

  console.log(calculateExercises(excerciseHoursInWeek, 1))
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}
 