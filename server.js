import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import DoctorRoutes from './routes/DoctorRoutes.js';
import PatientRoutes from './routes/PatientRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

connectDB();


app.use('/api/doctors', DoctorRoutes);
app.use('/api/patients', PatientRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));