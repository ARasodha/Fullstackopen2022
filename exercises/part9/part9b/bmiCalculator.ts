interface BmiValues {
  heightCm: number;
  weightKg: number;
}

const parseArgumentsBmi = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightCm: Number(args[2]),
      weightKg: Number(args[3])
    }
  } else {
    throw new Error('Provided arguments are not numbers!');
  }
}

function calculateBmi(heightCm: number, weightKg: number): string {
  const heightM: number = heightCm / 100;
  const BMI = weightKg / Math.pow(heightM, 2);

  if (BMI < 16.0) {
    return "Severely Underweight";
  } else if (BMI >= 16.0 && BMI <= 18.4) {
    return "Underweight";
  } else if (BMI >= 18.5 && BMI <= 24.9) {
    return "Normal (healthy weight)";
  } else if (BMI >= 25.0 && BMI <= 29.9) {
    return "Overweight";
  } else if (BMI >= 30.0 && BMI <= 34.9) {
    return "Moderately Obese";
  } else if (BMI >= 35.0 && BMI <= 39.9) {
    return "Severely Obese";
  } else {
    return "Morbidly Obese";
  }
}

try {
  const { heightCm, weightKg } = parseArgumentsBmi(process.argv);
  console.log(calculateBmi(heightCm, weightKg))
} catch (error: unknown) {
  let errorMessage: string = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }

  console.log(errorMessage)
}

// console.log(calculateBmi(180, 74)) // Normal (healthy weight)