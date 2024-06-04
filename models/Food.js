import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  'Nazwa': {
    type: String,
    required: true
  },
  'Kcal': {
    type: Number,
    required: true
  },
  'Jednostka': {
    type: String,
    required: true
  },
  'Ilosc_tluszczu': {
    type: Number,
    required: true
  },
  'Ilosc_bialka': {
    type: Number,
    required: true
  },
  'Ilosc_weglowodanow': {
    type: Number,
    required: true
  },
  'Rodzaj': {
    type: String,
    required: true
  }
}, { strict: false });

const Food = mongoose.model('Food', foodSchema, 'Food');
export { Food };
