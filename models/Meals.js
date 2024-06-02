// models/Meal.js
import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['sniadanie', 'obiad', 'kolacja', 'przekaski'],
    required: true
  },
  foodItems: [{
    name: {
      type: String, // Dodaj właściwość name
      required: true
    },
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }]
});

const Meal = mongoose.model('Meal', mealSchema);
export  { Meal };
