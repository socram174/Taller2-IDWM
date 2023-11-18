import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Admin } from "../models/Admin.js";
import dotenv from "dotenv";
dotenv.config();

export const seedAdmins = async () => {
  try {
    console.log("Seeding admins...");

    const password = "Jaqamain3pals";

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

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
