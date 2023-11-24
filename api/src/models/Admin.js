import mongoose from 'mongoose';

// Modelo del administrador con su username unico
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
        
    },
    password: {
        type: String,
        required: true,
    }
});

export const Admin = mongoose.model('Admin', AdminSchema);