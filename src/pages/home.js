// src/components/Home.js
import React from 'react';
import './Home.css';
import logo from '../components/asset/rozers-hitam.png'; // Ganti dengan path yang sesuai untuk logo Anda
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <img src={logo} alt="Logo" style={{ width: '300px', height: '300px' }} />
        <h1>Welcome to Rozers Store</h1>
        
        {/* Tambahkan kelas "login-btn" pada tombol */}
        <button className="login-btn" onClick={() => window.location.href = '/login'}>
          Login
        </button>

        <p>Top Up dan Bersiaplah untuk menaklukkan dunia gaming</p>
      </div>
    </div>
  );
};

export default Home;
