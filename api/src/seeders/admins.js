import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Admin } from "../models/Admin.js";
import dotenv from "dotenv";
dotenv.config();

// Funcion para crear un administrador en la base de datos
export const seedAdmins = async () => {
  try {
    console.log("Seeding admins...");

    // Password del administrador
    const password = "Jaqamain3pals";

    // Encriptar el password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear el administrador con el password encriptado
    const admin = {
      username: "Ochietto",
      password: passwordHash,
    };

    await mongoose.connect(process.env.MONGO_URL);

    await Admin.deleteMany({});

    await Admin.create(admin);

    await mongoose.connection.close();

    console.log("Admins seeded!");
  } catch (error) {
    console.log(error.errors);
  }
};

seedAdmins();
