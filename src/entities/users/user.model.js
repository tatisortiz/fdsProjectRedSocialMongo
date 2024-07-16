import { Schema, model } from "mongoose";

const UserShema = new Schema(
    {
        first_name: {
            type: String,
            required: true
        },

        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true,

        },

        is_active: {
            type: Boolean,
            default: true,
        },

        role: {
            type: String,
            enum: ["user", "admin", "super_admin"],
            default: "user"
        },
    },
    {
        timestamps: true,

    }
);

const User = model('User', UserShema);

export default User;
