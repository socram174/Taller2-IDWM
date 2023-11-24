import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { User } from '../models/User.js';

// Controlador para el login de administradores
export const adminLogin = async (req, res) => {

    try{
        const { username, password } = req.body;

        // Verificar que el usuario y contraseña no esten vacios
        if(!username || !password) return res.status(400).json({ success: false, message: "El usuario y contraseña son requeridos" });

        const foundAdmin = await Admin.findOne({ username: username });

        // Verificar que el usuario exista
        if(!foundAdmin) return res.status(404).json({success: false, message: "El usuario no existe" });

        const isPasswordCorrect = await bcrypt.compare(password, foundAdmin.password);

        // Verificar que la contraseña sea correcta
        if(!isPasswordCorrect) return res.status(400).json({ success: false, message: "Credenciales invalidas" });

        // Crear el token con el id del administrador
        const token = jwt.sign({ id: foundAdmin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const admin = {
            username: foundAdmin.username,
            id: foundAdmin._id
        };
        
        res.status(200).json({ admin, token, success: true });
    }catch(error){
        res.status(500).json({success: false,  message: "Internal Server Error" });

    }
};

// Controlador para el registro de usuarios
export const userRegister = async (req, res) => {

    try{
        const {
            name,
            lastName,
            rutOrDni,
            email,
            points

        } = req.body;

        // Se verifica que no exita ni el rut o dni ni el email
        const verifyRutOrDni = await User.findOne({ rutOrDni: rutOrDni });
        const verifyEmail = await User.findOne({ email: email });

        // Si existe alguno de los dos se retorna un error
        if(verifyRutOrDni) return res.status(400).json({ success: false, message: "El rut o dni ya existe" });
        if(verifyEmail) return res.status(400).json({ success: false, message: "El email ya existe" });


        const newUser = new User({
            name,
            lastName,
            rutOrDni,
            email,
            points
        });

        // Se guarda el usuario en la base de datos
        const user = await newUser.save();

        res.status(201).json({ success: true, user });
    }
    catch(error){
        res.status(500).json({ success: false, message: error.message });
    }


};