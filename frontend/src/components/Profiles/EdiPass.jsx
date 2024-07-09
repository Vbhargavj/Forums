import React, { useState } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';

export function EdiPass() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prevShowPasswords) => ({
      ...prevShowPasswords,
      [field]: !prevShowPasswords[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage('New password and confirmation do not match.');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await axios.patch('http://localhost:3000/api/v1/user/update-password', {
        passwordCurrent: formData.currentPassword,
        password: formData.newPassword,
        passwordConfirm: formData.confirmPassword
      });
      setSuccessMessage('Password updated successfully!');
      setErrorMessage('');
      console.log('Response:', response.data);
    } catch (error) {
      setErrorMessage('Failed to update password. Please try again.');
      setSuccessMessage('');
      console.error('Error:', error);
    }
  };

  return (
    <div className="mb-4 relative">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-black-800"
          >
            Current Password:
          </label>
          <div className="flex items-center">
            <input
              type={showPasswords.currentPassword ? 'text' : 'password'}
              id="currentPassword"
              name="currentPassword"
              placeholder="Enter your Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md pr-10"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('currentPassword')}
              className="focus:outline-none -ml-8"
            >
              <img
                src={showPasswords.currentPassword ? "/visible.svg" : "/invisible.svg"}
                alt="Toggle visibility"
                className="w-4"
              />
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-black-800 mt-4"
          >
            New Password:
          </label>
          <div className="flex items-center">
            <input
              type={showPasswords.newPassword ? 'text' : 'password'}
              id="newPassword"
              name="newPassword"
              placeholder="Enter your New Password"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md pr-10"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('newPassword')}
              className="focus:outline-none -ml-8"
            >
              <img
                src={showPasswords.newPassword ? "/visible.svg" : "/invisible.svg"}
                alt="Toggle visibility"
                className="w-4"
              />
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-black-800 mt-4"
          >
            Confirm New Password:
          </label>
          <div className="flex items-center">
            <input
              type={showPasswords.confirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md pr-10"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirmPassword')}
              className="focus:outline-none -ml-8"
            >
              <img
                src={showPasswords.confirmPassword ? "/visible.svg" : "/invisible.svg"}
                alt="Toggle visibility"
                className="w-4"
              />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center space-x-2">
          <Button type="submit" variant="contained" color="primary" className="mt-4">
            Change Password
          </Button>
        </div>

        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default EdiPass;
