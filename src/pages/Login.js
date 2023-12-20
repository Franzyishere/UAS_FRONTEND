import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';
import axios from 'axios';  // Import Axios
import './Login.css';
import logo from '../components/asset/rozers-hitam.png';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      axios.post('http://localhost:8080/login', {
        username: username,
        password: password
      })
      .then(response => {
        console.log("Response API : ",response.data);
        if (response.data.code === 200) {
          window.location.href = '/dashboard'
        } else {
          axios.post('http://localhost:8080/loginadmin', {
        username: username,
        password: password
      })
      .then(response => {
        console.log("Response API : ",response.data);
        if (response.data.code === 200) {                                                       
          window.location.href = '/admin'
        } else {
          alert('Login gagal. Silakan coba lagi.');
        }
      })
      .catch(error => {
        // Tangani error dari API
        console.error('Error login:', error);
      });
        }
      }
      )
      .catch(error => {
        // Tangani error dari API
        console.error('Error login:', error);
      });
    } else {
      alert('Login gagal. Harap masukkan nama pengguna dan kata sandi yang valid.');
    }
  };

  useEffect(() => {
    setIsActive(true);
  }, []);

  return (
    <div>
      <Navbar />
      <div className={`login-container ${isActive ? 'active' : ''}`}>
        <div className="login-box">
          <img src={logo} alt="Logo" className="logo" />
          <h2>Login</h2>
          <div className="input-group">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={handleLogin}>Login</button>
          <div className="register-link">
          <p>
      Don't have an account? <span><Link to="/register">Register</Link></span>
    </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
