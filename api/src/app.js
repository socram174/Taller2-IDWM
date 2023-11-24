import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
dotenv.config();

// Configuracion de express y middlewares
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

// Importar rutas
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

app.get('/', (req, res) => {
    res.status(200).json({message: "DUMBO"});
});

// Rutas de la API
app.use('/api/auth', authRoutes );
app.use('/api/users', userRoutes );

// Puerto de la API: si no existe el puerto en el archivo .env, se usa el puerto 3000
const PORT = process.env.PORT || 3000;

// Conexion a la base de datos
mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("Database Connected!");
    // Iniciar el servidor una vez conectado a la base de datos
    app.listen(PORT,() => console.log(`Listening at: http://localhost:${PORT}`));
})

.catch((error) => console.log(`${error} did not connect`));