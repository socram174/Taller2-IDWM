import mongoose from 'mongoose';

// Modelo del usuario con rut e email unicos
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    lastName: {
        type: String,
        required: true,
    },
    rutOrDni: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
});

export const User = mongoose.model('User', UserSchema);