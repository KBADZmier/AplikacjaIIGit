import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { forPersonBmi } from '/mformulas/formulas';

function UserInfo() {
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        height: 0,
        weight: 0,
        old: 0,
        gender: '',
        activitylvl: 0
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
        fetchUserData();//aktualne dane 
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
                    <p>Poziom aktywności: {existingData.activitylvl}</p>
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
                    {[1, 2, 3, 4, 5, 6].map(level => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Submit</button>
            <div>
                {existingData && <label>BMI: { forPersonBmi(existingData.height, existingData.weight)}</label>}
            </div>
        </form>
    );
}

export default UserInfo;
