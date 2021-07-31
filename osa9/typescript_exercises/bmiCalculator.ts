type BMIResult = string;

const calculateBmi = (height: number, weight: number) : BMIResult => { 
  const heightAsMeters = height / 100;
  const bmi = weight / heightAsMeters / heightAsMeters; 
 
// Underweight (Severe thinness)	< 16.0	 
// Underweight (Moderate thinness)	16.0 – 16.9	 
// Underweight (Mild thinness)	17.0 – 18.4 
// Normal range	18.5 – 24.9	 
// Overweight (Pre-obese)	25.0 – 29.9 
// Obese (Class I)	30.0 – 34.9	 
// Obese (Class II)	35.0 – 39.9 
// Obese (Class III)	≥ 40.0  

   let bmiResultText = '';

   switch (true) {
    case (bmi <= 16): 
        bmiResultText = 'Underweight (Severe thinness)';
        break;
    case (bmi >= 16 && bmi < 17): 
        bmiResultText = 'Underweight (Moderate thinness)';
        break;
    case (bmi >= 17 && bmi < 18.5):
        bmiResultText = 'Underweight (Mild thinness)';
        break;
    case (bmi >= 18.5 && bmi < 25):
        bmiResultText = 'Normal range (healthy weight)';
        break;
    case (bmi >= 25 && bmi < 30):
        bmiResultText = 'Overweight (Pre-obese)';
        break;
    case (bmi >= 30 && bmi < 35):
        bmiResultText = 'Obese (Class I)';
        break;
    case (bmi >= 35 && bmi < 40):
        bmiResultText = 'Obese (Class II)';
        break;
    case (bmi >= 40):
        bmiResultText = 'Obese (Class II)';
        break;
    default: 
        bmiResultText = 'Not Defined';
        break;
    }
   
    return bmiResultText; 
};

//Tehtävä 9.3
    // const args = process.argv.slice(2); 
 
    // const height : number = +args[0];
    // const weight : number = +args[1];

    // console.log(calculateBmi(height, weight)); 
    
    // console.log(calculateBmi(180, 74));
// } catch (e) {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     console.log('Something went wrong, error message: ', e.message);
// }
 
export { calculateBmi };