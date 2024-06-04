import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { forPersonBmi, ZKM, ZKK } from '/mformulas/formulas';

const activityLevels = {
    1: 1.0,
    2: 1.2,
    3: 1.4,
    4: 1.6,
    5: 1.8,
    6: 2.0
};

const activityDescriptions = {
    1: 'Leżący lub siedzący tryb życia, brak aktywności fizycznej',
    2: 'Praca siedząca, aktywność fizyczna na niskim poziomie',
    3: 'Praca nie fizyczna, trening 2 razy w tygodniu',
    4: 'Lekka praca fizyczna, trening 3-4 razy w tygodniu',
    5: 'Praca fizyczna, trening 5 razy w tygodniu',
    6: 'Ciężka praca fizyczna, codzienny trening'
};

function UserInfo() {
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        height: 0,
        weight: 0,
        old: 0,
        gender: '',
        activitylvl: 1 // Domyślny poziom aktywności
    });
    const [existingData, setExistingData] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/user/info', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setExistingData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/user/info', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Survey submitted successfully');
        } catch (error) {
            console.error('Error submitting survey', error);
            alert('Error submitting survey');
        }
    };

    const handleUpdateData = async () => {
        fetchUserData(); // aktualne dane 
    };


    return (
        <form onSubmit={handleSubmit}>
            {existingData && (
                <div>
                    <h2>Twoje dane:</h2>
                    <p>Wzrost: {existingData.height}</p>
                    <p>Waga: {existingData.weight}</p>
                    <p>Wiek: {existingData.old}</p>
                    <p>Płeć: {existingData.gender}</p>
                    <p>Poziom aktywności: {activityDescriptions[existingData.activitylvl]}</p>
                    <button type="button" onClick={handleUpdateData}>Aktualizuj dane</button>
                </div>
            )}
            <div>
                <label>Height:</label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} required />
            </div>
            <div>
                <label>Weight:</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
            </div>
            <div>
                <label>Old:</label>
                <input type="number" name="old" value={formData.old} onChange={handleChange} required />
            </div>
            <div>
                <label>Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="zenska">Female</option>
                    <option value="meska">Male</option>
                </select>
            </div>
            <div>
                <label>Activity Level:</label>
                <select name="activitylvl" value={formData.activitylvl} onChange={handleChange} required>
                    <option value="">Select</option>
                    {Object.keys(activityDescriptions).map(level => (
                        <option key={level} value={level}>{activityDescriptions[level]}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Zatwierdź</button>
            <div>
                {existingData && <label>BMI: {forPersonBmi(existingData.height, existingData.weight)}</label>}
            </div>
            <div>
                {existingData && (
                    <label>Zapotrzebowanie kaloryczne:
                        {existingData.gender === 'meska' 
                            ? `ZKM: ${ZKM(existingData.height, existingData.weight, existingData.old, activityLevels[existingData.activitylvl])}`
                            : `ZKK: ${ZKK(existingData.height, existingData.weight, existingData.old, activityLevels[existingData.activitylvl])}`}
                    </label>
                )}
                     
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default UserInfo;
