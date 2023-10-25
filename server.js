import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

const app = express();
app.use(express.json());

dotenv.config();

connectDB();


app.use('/', (req, res) => {
    res.send({'Hello World': 'Hello World'});
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));