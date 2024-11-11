// src/components/Register.js
import React, { useState } from 'react';
import { registerUser } from '../api/authApi';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminAdd = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Seller',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      alert('Registration successful!');
      Navigate('/dashboard')
      console.log(data);
    } catch (error) {
      alert(`Registration failed: ${error}`);
    }
  };

  const formStyle = {
    maxWidth: '400px',
    margin: '200px 570px',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    textAlign: 'center',
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '1.5rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#6F4FF2',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={headingStyle}>ADD ADMIN</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="Admin">Admin</option>
        <option value="Seller">Seller</option>
      </select>
      <button type="submit" style={buttonStyle}>Register</button>
    </form>
  );
};

export default AdminAdd;
