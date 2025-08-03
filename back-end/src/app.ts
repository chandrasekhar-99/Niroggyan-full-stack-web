import express from 'express';
import doctorRoutes from './routes/doctorRoutes';

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/doctors', doctorRoutes);

export default app;
