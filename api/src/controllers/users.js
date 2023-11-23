import { User } from '../models/User.js';

export const getUsers = async (req, res) => {
    
        try{
            const users = await User.find({});
    
            res.status(200).json({ success: true, users });
        }catch(error){
            res.status(500).json({success: false,  message: "Internal Server Error" });
    
        }
};

export const deleteUser = async (req, res) => {

    try{
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user) return res.status(404).json({ success: false, message: "User not found" });

        res.status(200).json({ success: true, message: "User deleted successfully"});
    }catch(error){
        res.status(500).json({success: false,  message: "Internal Server Error" });

    }
};