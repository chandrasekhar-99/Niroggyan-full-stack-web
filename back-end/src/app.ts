import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import doctorRoutes from './routes/doctorRoutes';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Niroggyan API');
});



app.use('/api/doctors', doctorRoutes);

export default app;
