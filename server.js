import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import DoctorRoutes from './routes/DoctorRoutes.js';
import PatientRoutes from './routes/PatientRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

const allowedOrigins = [process.env.FRONTEND_URL];

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     }
// }

const corsOptions = {
    origin: 'https://caretrack.vercel.app',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    }


app.use(cors(corsOptions));


app.use('/api/doctors', DoctorRoutes);
app.use('/api/patients', PatientRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));