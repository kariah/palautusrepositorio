// 'use strict'

interface ExcerciseCalculationResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
  }

const calculateExercises  = (target: number, excerciseHoursInPeriod:number[]) : ExcerciseCalculationResult => {

    // console.log('target 2 ', target)
    // console.log('excerciseHoursInPeriod 2 ', excerciseHoursInPeriod) 

     const sumOfTrainingHours =  excerciseHoursInPeriod.reduce((a, b) => a + b, 0)
     const trainingDays = excerciseHoursInPeriod.filter(x => x > 0).length


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

    //  console.log('excerciseHoursInPeriod ', excerciseHoursInPeriod)
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
        ratingDescription = "Near target or litle over the target, well done!"
      }
      else if (averageTrainingHoursComparedToTarget >= 1)
      {
        rating = 3
        ratingDescription = "A lot over the target, excellent!"
      }


      let exerciseCalculationResult = {
        periodLength: excerciseHoursInPeriod.length,
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
    let target : number = null
    const excerciseHoursInPeriod : number[] = new Array()

    for (let i = 0; i < process.argv.length; i++) {
        // 0 -> C:\Users\T430\fso2021-kurssi\Osa9\typescript_exercises\node_modules\ts-node\dist\bin.js
        // 1 -> C:\Users\T430\fso2021-kurssi\osa9\typescript_exercises\exerciseCalculator.ts  

        //Starting for argv2
        if (i > 1)
        {   
            console.log(i + ' --> ' + (process.argv[i]))
            if (i === 2)
            {
                target = parseInt(process.argv[i])
            }
            else
            {
                excerciseHoursInPeriod.push(parseFloat(process.argv[i]))
            }
        }
    }

    // console.log('target ', target)
    // console.log('excerciseHoursInPeriod ', excerciseHoursInPeriod)  

    console.log(calculateExercises(target,excerciseHoursInPeriod))
 

} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}
