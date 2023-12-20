// src/components/Register.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import axios from 'axios'; // Import axios library
import logo from '../components/asset/rozers-hitam.png';

const Register = ({ onRegister }) => {
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nama, setNama] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (username && password && nama) {
      // Menggunakan axios untuk melakukan permintaan POST ke API
      axios.post('http://localhost:8080/insert-register', {
        nama: nama,
        username: username,
        password: password
      })
      .then(response => {
        console.log(response.data);
        onRegister(username, nama);
        navigate('/login');
        alert('Registration successful! You can now log in.');
      })
      .catch(error => {
        // Handle error dari API
        console.error('Error registering:', error);
        alert('Registration failed. Please try again.');
      });
    } else {
      alert('Registration failed. Please enter a valid username, password, and name.');
    }
  };

  useEffect(() => {
    setIsActive(true);
  }, []);

  return (
    <div>
      <Navbar />
      <div className={`register-container ${isActive ? 'active' : ''}`}>
        <div className="register-box">
          <img src={logo} alt="Logo" className="logo" />
          <h2>Register</h2>
          {/* Input field untuk Nama */}
          <div className="input-group">
            <label>Nama:</label>
            <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
          </div>
          {/* Input field untuk Username */}
          <div className="input-group">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          {/* Input field untuk Password */}
          <div className="input-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Register;