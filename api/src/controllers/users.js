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

export const editUser = async (req, res) => {
    try{
        const { rutOrDni } = req.params;
        console.log(rutOrDni);

        const { name, lastName, email, points} = req.body;

        console.log(name, lastName, email, points);

        const user = await User.findOne({ rutOrDni: rutOrDni });


        if(user.email === email){
            if(name) user.name = name;
            if(lastName) user.lastName = lastName;
            if(points) user.points = points;
            await user.save();

            res.status(200).json({ success: true, message: "User updated successfully"});

        }else {
            const checkUser = await User.findOne({ email: email });
            if(checkUser) return res.status(404).json({ success: false, message: "El email ya esta en uso" });

            if(name) user.name = name;
            if(lastName) user.lastName = lastName;
            if(points) user.points = points;
            user.email = email;

            await user.save();

            res.status(200).json({ success: true, message: "User updated successfully"});

        }
    }catch(error){
        console.log(error);
        res.status(500).json({success: false,  message: "Internal Server Error" });
    }
};