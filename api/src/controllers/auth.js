import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

export const adminLogin = async (req, res) => {

    try{
        const { username, password } = req.body;

        if(!username || !password) return res.status(400).json({ success: false, message: "Username and password are required" });

        const foundAdmin = await Admin.findOne({ username: username });

        if(!foundAdmin) return res.status(404).json({success: false, message: "Admin not found" });

        const isPasswordCorrect = await bcrypt.compare(password, foundAdmin.password);

        if(!isPasswordCorrect) return res.status(400).json({ success: false, message: "Invalid credentials" });

        const token = jwt.sign({ id: foundAdmin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const admin = {
            username: foundAdmin.username,
            id: foundAdmin._id
        };
        
        res.status(200).json({ admin, token, success: true });
    }catch(error){
        res.status(500).json({success: false,  message: "Internal Server Error" });

    }
};