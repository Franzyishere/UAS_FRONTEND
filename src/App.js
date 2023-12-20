import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import BrowserRouter
import axios from 'axios';
import Home from './pages/home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import OrderPage from './pages/Order';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async (username, password, navigate) => {
    try {
      if (username && password) {
        const response = await axios.post('http://localhost:8080/login', {
          username: username,
          password: password
        });
  
        console.log(response.data);
  
        // Periksa apakah login berhasil berdasarkan respons dari server
        if (response.data.success) {
          setUser({ username: username, password: password }); // Set user with username and password
          navigate('/dashboard'); // Navigasi ke dasbor saat login berhasil
        } else {
          alert('Login gagal. Nama pengguna atau kata sandi tidak valid.');
        }
      } else {
        alert('Login gagal. Harap masukkan nama pengguna dan kata sandi yang valid.');
      }
    } catch (error) {
      console.error('Error login:', error);
      alert('Login gagal. Silakan coba lagi.');
    }
  };
  

  const handleRegister = (username) => {
    setUser(username);
  };

  return (
    <Router>
      <div>
        {/* ... */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route path="/dashboard" element={<Dashboard onRegister={handleLogin} />} />
          <Route path="/order" element={<OrderPage onRegister={handleRegister} />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
