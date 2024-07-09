// src/components/EditProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    number: '',
    email: '',
    name: '',
    password: '',
    newPassword: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/user/me')
        .then(response => {
            setFormData(response.data.data.doc);
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
        });
}, []); 
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch('http://localhost:3000/api/v1/user/updateMe', formData);
      setSuccessMessage('Profile updated successfully!');
      setErrorMessage('');
      console.log('Response:', response.data);
    } catch (error) {
      setErrorMessage('Failed to update profile. Please try again.');
      setSuccessMessage('');
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Number</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="flex flex-wrap justify-center space-x-2">
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Update
          </button>
        </div>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default EditProfile;
