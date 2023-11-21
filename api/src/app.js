import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

app.get('/', (req, res) => {
    res.status(200).json({message: "DUMBO"});
});

app.use('/api/auth', authRoutes );
app.use('/api/users', userRoutes );

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("Database Connected!");
    app.listen(PORT,() => console.log(`Listening at: http://localhost:${PORT}`));
})

.catch((error) => console.log(`${error} did not connect`));