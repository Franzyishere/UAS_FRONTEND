// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../components/asset/rozers-hitam.png';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    
    <nav className="navbar">
      <div className="navbar-links">
        <div className="logo-container">
          <img src={logo} alt='logo' className="logo-img" style={{ width: '80px', height: '80px' }}/>
        </div>

        {/* Menampilkan link-menu di samping kanan logo */}
        <div className="menu-links">
          <Link to="/" className="menu-link">Home</Link>
          <Link to="/cek-pesanan" className="menu-link">Cek Pesanan</Link>
          <Link to="/daftar-harga" className="menu-link">Daftar Harga</Link>
          <Link to="/tentang-kami" className="menu-link">Tentang Kami</Link>
        </div>
      </div>

      <div className="profile-info">
        <FontAwesomeIcon icon={faUser} className="user-icon" />
        franzyyy
      </div>
      <div className='toggle-btn'>
        <FontAwesomeIcon icon={faBars} className="user-icon ms-icon"/>
      </div>
    </nav>
  );
};

export default Navbar;
