import mongoose from "mongoose";

// Definiuj schemat
const foodSchema = mongoose.Schema({},{strict:false});

const Food = mongoose.model("Food", foodSchema, "Food");
export { Food };