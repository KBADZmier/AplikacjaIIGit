
import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
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
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    Nazwa: {
      type: String,
      required: true
    },
    Kcal: {
      type: Number,
      required: true
    },
    Jednostka: {
      type: String,
      required: true
    },
    Ilosc_tluszczu: {
      type: Number,
      required: true
    },
    Ilosc_bialka: {
      type: Number,
      required: true
    },
    Ilosc_weglowodanow: {
      type: Number,
      required: true
    },
    Rodzaj: {
      type: String,
      required: true
    }
  }]
});

const Meal = mongoose.model('Meal', mealSchema);
export { Meal };
