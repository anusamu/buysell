// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import { Button } from 'bootstrap';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      localStorage.setItem('token', data.token);

      if (data.user.role === 'Admin') {
        navigate('/dashboard');
      } else if (data.user.role === 'Seller') {
        navigate('/');
      } else {
        alert('Unknown role');
      }
    } catch (error) {
      alert(`Login failed: ${error}`);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        <br />
        <a href="#">Forget Your Password?</a>
        <br />
        <Link
         to={'/register'} style={{color: 'white'}}><button color="inherit" sx={{  margin:2,'&:hover': { border: 'none', 
        backgroundColor: 'white', color: '#86D293'},'&:focus': {outline: 'none'}}}>Create Account</button></Link>
        <h1></h1>
      </form>
    </div>

  );
};

// Inline CSS styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height to center vertically
    // backgroundColor: '#FFF1DB',
    marginLeft: '600px'
    

  },
  form: {
    width: '300px',
    padding: '2rem',
    backgroundColor: '#FFF1DB',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // marginLeft: '50px'
  },
  title: {
    marginBottom: '1.5rem',
    fontSize: '24px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '0.8rem',
    backgroundColor: '#6F4FF2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
};

export default Login;
