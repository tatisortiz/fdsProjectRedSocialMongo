import bcrypt from "bcrypt";
import "dotenv/config";
import mongoose from "mongoose";
import User from "../../entities/users/user.model.js";

export const userSeeder = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        
        const users = [
            {   
                
                first_name: "user",
                last_name: "user",
                email: "user1@user1.com",
                password: bcrypt.hashSync("123456789",parseInt(process.env.SALT_ROUNDS)),
                role: "user",
            },
        
            {
                
                first_name: "superadmin",
                last_name: "superadmin",
                email: "superadmin@superadmin.com",
                password: bcrypt.hashSync("123456789",parseInt(process.env.SALT_ROUNDS)),
                role: "super_admin",
            },
            {
              
                first_name: "jehova",
                last_name: "jehova",
                email: "jehova@jehova.com",
                password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS)),
                role: "user",
            },
            {
                
                first_name: "mama",
                last_name: "madre",
                email: "madre@madre.com",
                password: bcrypt.hashSync("12345689", parseInt(process.env.SALT_ROUNDS)),
                role: "user",
            },
            {
                
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




        
  
        
       


