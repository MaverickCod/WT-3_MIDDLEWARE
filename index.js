import express from 'express';
import { errorHandler, validateRegistration } from './middlewares/register.js';

const app = express();

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is working fine!' });
});

app.post('/register', validateRegistration, (req, res) => {
  res.status(201).json({ message: 'User registered successfully' });
});

app.use(errorHandler);

app.listen(6969, () => {
  console.log('Server running on port 6969');
});
