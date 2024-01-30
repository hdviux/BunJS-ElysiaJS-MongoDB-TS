// import mongoose from 'mongoose';

// const ConnectDB = async () => {
//     const mongoDBURI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';
//     try {
//         await mongoose.connect(mongoDBURI);
//         console.info(`Connected to database successfully`);
//     } catch (error) {
//         console.error("Could not connect to db");
//         process.exit(1);
//     }
// }

// export default ConnectDB;

import mongoose from "mongoose";
import UserModel, { TypeUser } from "../models/user.model";
import config from "./index";

export const connect = async () => {
    try {
        await mongoose.connect(config.DB_URL as string);
        console.info(`Connected to database successfully!`);
    } catch (error) {
        console.error("Could not connect to db");
        process.exit(1);
    }
}

export const createAdmin = async () => {
    try {
        const findUser = await UserModel.findOne({ userName: "admin" });
        if (findUser) {
            console.log("Admin already exists");
        } else {
            const hashPassword = await Bun.password.hash("fahas2g45r55jjace")
            const data: TypeUser = {
                userName: "admin",
                email: "",
                password: hashPassword,
            };
            await UserModel.create(data);
            console.log("Created admin successfully");
        }
    } catch (error) {
        console.log(error);
    }
};
