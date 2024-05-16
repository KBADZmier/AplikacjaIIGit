import mongoose from "mongoose";


const UserSchema = mongoose.Schema({},{strict:false});

const User = mongoose.model("Users", UserSchema, "Users");
export { User };