import { Schema, model } from "mongoose";

const Usershema = new Schema(
{ 
   email:{
    type: String,
    required: true,
    unique:true
   },

   password:{
    type: String,
    required: true,

   },

   is_active: {
    type: Boolean,
    default: true,
  },

   role: {
  type: String,
  Enum: ["user","admin","super_admin"],
  default: "user"
  },
},
{
    timestamps: true,
   
}
);

const User = model('User',Usershema);

export default User;
