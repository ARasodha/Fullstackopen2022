import express from 'express';
import { calculator } from './calculator';

const app = express();
const PORT = 3000;

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.post('/calculate', (req, res) => {
   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { value1, value2, op } = req.body;
  
  if ( !value1 || isNaN(Number(value1))) {
    return res.send({ error: '...'}).status(400);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(Number(value1), Number(value2), op);
  return res.send(result);
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));