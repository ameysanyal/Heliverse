import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import usersRoutes from './routes/user.route.js'
import teamRoutes from './routes/team.route.js'
// import cron from 'node-cron';
// import axios from 'axios';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

// // Solution for keeping the backend service always active (cron job)
// cron.schedule('*/10 * * * *', async () => {
//     try {
//         const response = await axios.get(`https://todos-backend-z4nv.onrender.com`);
//         console.log(`Pinging backend service, status: ${response.status}`);
//     } catch (error) {
//         console.error('Error pinging backend service:', error);
//     }
// });


// root path route
app.get('/', (req, res) => {

    return res.status(200).send('Welcome to Heliverse Users app backend');
});

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });


app.use('/api/users', usersRoutes)
app.use('/api/team', teamRoutes)





// mongoimport --uri="mongodb+srv://Heliverse-Users:Heliverse-Users@cluster0.rj39h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" --collection=users --file=users.json --jsonArray

