import express from 'express';
import {Food} from "./models/Food.js";


const app = express();
const PORT = process.env.PORT || 5000;
var foodsReady;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost:27017/Food", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//naprawa bledu z dostep na inny host
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.get("/api/Food", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
