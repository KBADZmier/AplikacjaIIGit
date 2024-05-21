import express from 'express';
import mongoose from 'mongoose';
import { Food } from './models/Food.js';
import bodyParser from 'body-parser';
import router from './login.js'
import authenticateToken, { authorizeRole } from './authenticateToken.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use('/login', router);


app.use(bodyParser.json());



mongoose.connect("mongodb://localhost:27017/Food", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Naprawa błędu z dostępem na inny host
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
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

app.post('/api/foods', async (req, res) => {
  try {
    const newFood = new Food(req.body);
    await newFood.save();
    res.status(201).send(newFood);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


app.delete('/api/foods/:id', authorizeRole(['admin']),async (req, res) => {
    try {
      const { id } = req.params;
      const deletedFood = await Food.findByIdAndDelete(id);
  
      if (deletedFood) {
        res.status(200).json({ message: 'Produkt usunięty' });
      } else {
        res.status(404).json({ message: 'Produkt nie znaleziony' });
      }
    } catch (error) {
      console.error('Błąd usuwania produktu:', error);
      res.status(500).send("Server Error");
    }
  });


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
