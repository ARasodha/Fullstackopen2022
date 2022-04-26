import express from 'express';
import bodyParser from 'body-parser';
import calculateBmi from './bmiCalculator';
import calculateExercises from "./exerciseCalculator";

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const heightCm = Number(req.query.height);
  const weightKg = Number(req.query.weight);

  const json = {
    weight: weightKg,
    height: heightCm,
    bmi: calculateBmi(Number(heightCm), Number(weightKg))
  };

  if (isNaN(heightCm) || isNaN(weightKg)) {
    res.send(JSON.stringify({ error: "malformatted parameters" }));
  } else if (heightCm && weightKg) {
    res.send(JSON.stringify(json));
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.send({ error: "parameters missing" }).send(400);
  } else if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.send({ error: "malformed parameters" }).send(400);
  }
   
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, Number(target));
  return res.send(result);
});

app.listen(PORT, () => console.log(`Sever is listening on PORT ${PORT}`));