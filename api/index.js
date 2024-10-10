import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'

dotenv.config();

mongoose.connect(
    process.env.MONGODB
)
.then(()=> {
    console.log('MongoDb is connected');
}).catch((err)=>{
    console.log(err);
});

const app = express();
app.use(express.json());

app.use('/api', appointmentRoutes);

app.listen(8090,()=> {
    console.log('Server is running on port 8090!!')
})

app.use('/api/test',userRoutes);