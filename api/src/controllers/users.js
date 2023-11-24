import { User } from '../models/User.js';

// Controlador para obtener todos los usuarios
export const getUsers = async (req, res) => {
    
        try{
            // Se obtienen todos los usuarios de la base de datos
            const users = await User.find({});
    
            res.status(200).json({ success: true, users });
        }catch(error){
            res.status(500).json({success: false,  message: "Internal Server Error" });
    
        }
};


// Controlador para eliminar un usuario segun su id
export const deleteUser = async (req, res) => {

    try{
        // Se obtiene el usuario por su id y se elimina
        const user = await User.findByIdAndDelete(req.params.id);

        // Si no existe el usuario se retorna un error
        if(!user) return res.status(404).json({ success: false, message: "User not found" });

        res.status(200).json({ success: true, message: "User deleted successfully"});
    }catch(error){
        res.status(500).json({success: false,  message: "Internal Server Error" });

    }
};

// Controlador para editar un usuario segun su rut o dni
export const editUser = async (req, res) => {
    try{
        // Se obtiene el rut o dni del usuario
        const { rutOrDni } = req.params;
        console.log(rutOrDni);

        // Se obtienen los datos del usuario que vienen en el body
        const { name, lastName, email, points} = req.body;

        console.log(name, lastName, email, points);

        // Se obtiene el usuario por su rut o dni
        const user = await User.findOne({ rutOrDni: rutOrDni });

        // Si el email que viene en el body es igual al email del usuario encontrado con el rut o dni, se actualizan todos los datos excepto el email
        if(user.email === email){
            if(name) user.name = name;
            if(lastName) user.lastName = lastName;
            if(points) user.points = points;
            await user.save();

            res.status(200).json({ success: true, message: "User updated successfully"});

       
        }else {  // Si el email que viene en el body es diferente al email del usuario encontrado con el rut o dni
            // Se verifica que el email no este en uso
            const checkUser = await User.findOne({ email: email });
            // Si el email esta en uso se retorna un error
            if(checkUser) return res.status(404).json({ success: false, message: "El email ya esta en uso" });


            // de lo contrario se actualizan todos los datos
            if(name) user.name = name;
            if(lastName) user.lastName = lastName;
            if(points) user.points = points;
            if(email) user.email = email;

            await user.save();

            res.status(200).json({ success: true, message: "User updated successfully"});

        }
    }catch(error){
        console.log(error);
        res.status(500).json({success: false,  message: "Internal Server Error" });
    }
};