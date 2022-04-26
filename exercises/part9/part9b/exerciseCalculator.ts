interface ExerciseInfo {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgumentsExercise = (args: string[]): number[] => {
  if (args.length < 3) throw new Error('not enough arguments');

  const inputArgs = args.slice(3).map(arg => Number(arg));
  if (inputArgs.every(arg => !isNaN(arg))) {
    return inputArgs;
  } else {
    throw new Error('Provided values are not all numbers!');
  }
};

function getTrainingDays(hours: number[]): number {
  let trainingDays = 0;
  hours.forEach(day => {
    if (day !== 0) {
      trainingDays++;
    }
  });

  return trainingDays;
}

function getRating(trainingDays: number, success: boolean): number {
  if (trainingDays === 7 && success) {
    return 3;
  } else if (trainingDays < 4) {
    return 1;
  } else {
    return 2;
  }
}

function getRatingDescription(rating: number): string {
  switch (rating) {
    case 1: 
      return "poor performance, needs improvement";
    case 3: 
      return "great job, keep it up!";
    default: 
      return "not too bad but could have been better";
  }
}

function calculateAverage(hours: number[]): number {
  return hours.reduce((accum, val) => accum + val, 0) / hours.length;
}

function calculateExercises(hours: number[], target = 2): ExerciseInfo {
  const periodLength: number = hours.length;
  const trainingDays: number = getTrainingDays(hours);
  const success: boolean = hours.every(hour => hour >= target);
  const rating: number = getRating(trainingDays, success);
  const ratingDescription: string = getRatingDescription(rating);
  const average: number = calculateAverage(hours);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
} 

try {
  const hours: number[] = parseArgumentsExercise(process.argv);
  console.log(calculateExercises(hours));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }

  console.log(errorMessage);
}

export default calculateExercises;

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2)) 
// { periodLength: 7,
//   trainingDays: 5,
//   success: false,
//   rating: 2,
//   ratingDescription: 'not too bad but could be better',
//   target: 2,
//   average: 1.9285714285714286 }

// $ npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4

// { periodLength: 9,
//   trainingDays: 6,
//   success: false,
//   rating: 2,
//   ratingDescription: 'not too bad but could be better',
//   target: 2,
//   average: 1.7222222222222223 }

