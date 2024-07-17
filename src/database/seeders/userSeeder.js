import bcrypt from "bcrypt";
import "dotenv/config";
import mongoose from "mongoose";
import User from "../../entities/users/user.model.js";

const userSeeder = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        
        const users = [
            {   
                _id: "5f8d0c0c9b8b4b2e8c2e2b3c",
                first_name: "user",
                last_name: "user",
                email: "user1@user1.com",
                password: bcrypt.hashSync("123456789",parseInt(process.env.SALT_ROUNDS)),
                role: "user",
            },
            // {
            //     _id: "55f8d0c0c9b8b4b2e8c2e2b9l",
            //     first_name: "admin",
            //     last_name: "admin",
            //     email: "admin@admin.com",
            //     password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
            //     role: "admin",
            // },
            {
                _id: "5f8d0c0c9b8b4b2e8c2e2b3e",
                first_name: "superadmin",
                last_name: "superadmin",
                email: "superadmin@superadmin.com",
                password: bcrypt.hashSync("123456789",parseInt(process.env.SALT_ROUNDS)),
                role: "super_admin",
            },
            {
                _id: "5f8d0c0c9b8b4b2e8c2e2b3f",
                first_name: "jehova",
                last_name: "jehova",
                email: "jehova@jehova.com",
                password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
                role: "user",
            },
            {
                _id: "5f8d0c0c9b8b4b2e8c2e2b40",
                first_name: "mama",
                last_name: "madre",
                email: "madre@madre.com",
                password: bcrypt.hashSync("12345689", parseInt(process.env.SALT_ROUNDS)),
                role: "user",
            },
            {
                _id: "5f8d0c0c9b8b4b2e8c2e2b41",
                first_name: "papa",
                last_name: "papa",
                email: "papa@papa.com",
                password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
                role: "user",
            }
        ];
        await User.insertMany(users);

		console.log("============================");
		console.log("Users seeder successfully");
		console.log("============================");

        
    } catch (error) {
        console.log('===========================');
        console.log('ERROR USERS SEEDER', error.message);
        console.log('===========================');
	} finally {
		await mongoose.connection.close();
	}
};


userSeeder();

        
  
        
       


