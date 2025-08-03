import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import doctorRoutes from './routes/doctorRoutes';
dotenv.config();
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to the Niroggyan API');
});
// Routes
app.use('/api/doctors', doctorRoutes);
export default app;
