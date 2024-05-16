import React, { useState } from 'react';
import axios from 'axios';

const fieldMapping = {
  name:"Nazwa",
  kcal:"Kcal", 
  unit:"Jednostka" ,
  fat:"Ilosc_tluszczu (g)", 
  protein:"Ilosc_bialka (g)", 
  carbo:"Ilosc_weglowodanow (g)",
  type:"Rodzaj"
};

function AddFood() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    kcal: 0, 
    unit: '',
    fat:  0, 
    protein: 0, 
    carbo: 0
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Name:", name, "Value:", value);
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const mappedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => {
          const mappedValue = ['kcal', 'fat', 'protein', 'carbo'].includes(key) ? parseFloat(value) : value;
          return [fieldMapping[key], mappedValue];
        })
      );
      console.log(mappedData);
      const response = await axios.post('http://localhost:5000/api/foods', mappedData );
      
      setMessage('Dodano pomyślnie!');
    
    
    } catch (error) {
      console.error('Błąd dodawania:', error);
      setMessage('Błąd dodawania');
    }

    setFormData({
      name: '',
      type: '',
      kcal: 0, 
      unit: '',
      fat:  0, 
      protein: 0, 
      carbo: 0
    });
  };

  return (
    <div>
      <h2>Dodaj nową rzecz</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(fieldMapping).map(([key, label]) => (
          <div key={key}>
            <label>{label}:</label>
            <input
                type={['name', 'type', 'unit'].includes(key) ? "text" : "number"}
              value={formData[key]}
              onChange={handleChange}
              name={key}
            />
          </div>
        ))}
        <button type="submit">Dodaj</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddFood;
