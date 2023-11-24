import mongoose from "mongoose";
import { User } from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

export const seedUsers = async () => {
  try {
    console.log("Seeding users...");


    const users =[
        {
            name: "Juan",
            lastName: "Perez",
            rutOrDni: "19734563-k",
            email: "juan@gmail.com",
            points: 500
        },
        {
            name: "Diego",
            lastName: "Sanchez",
            rutOrDni: "20485675-5",
            email: "diego@gmail.com",
            points: 1233
        },
        {
            name: "Matias",
            lastName: "Robledo",
            rutOrDni: "21844534-6",
            email: "matias@gmail.com",
            points: 22
        }
    ]

    await mongoose.connect(process.env.MONGO_URL);

    await User.deleteMany({});

    await User.insertMany(users);

    await mongoose.connection.close();

    console.log("Users seeded!");
  } catch (error) {
    console.log(error.errors);
  }
};

seedUsers();
