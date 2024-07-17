import { Schema, model } from "mongoose";


const PostShema = new Schema(
{ 
   title:{
    type: String,
    required: true,
   },

   description:{
    type: String,
    required: true,

   },

   userId: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
   ],
   likes: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
]
   
},
{
    timestamps: true,
    versionKey: false

}
);

const Post = model('Post',PostShema);

export default Post;
