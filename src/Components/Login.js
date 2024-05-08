import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '../Css/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailExists, setEmailExists] = useState(false); 
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        email,
        password,
      });
      // Save the token to local storage.
      localStorage.setItem('token', response.data.jwt);
      console.log('Login successful:', response.data);
      setLoggedIn(true);
      navigate('/companies');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const isEmailRegistered = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/check-email', {
        email,
      });
      setEmailExists(response.data.exists);
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  return (
    <div className="login-logo-container">
      <div className="login-container">
        <div className="login-left-container">
          <p className="login-introduction">
            Welcome back! <br /> Excited to have you here again. <br />
            Sign in to get back on track!
          </p>
          <p className="login-motto">Empowering Startups, Tracking Investments</p>
          <img src="images/picture.jpg" alt="Startup Vest Logo" className="login-picture" />
        </div>

        <div className="login-right-container">
          <img src="images/logo.png" alt="Startup Vest Logo" className="login-logo" />

          <div className="login-right-container-form">
            <header className="login-header">Sign In</header>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-details">
                <div className="details">
                  <div className="fields">
                  <div className="login-input-field email-input">
                      <label>Email*</label>
                      <input
                        type="text"
                        name="email"
                        placeholder="example@gmail.com"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailExists(false); 
                        }}
                        onBlur={isEmailRegistered} 
                      />
                      {emailExists && (
                        <p className="error-message">Email is already in use.</p>
                      )}
                    </div>

                    <div className="login-input-field">
                      <label>Password*</label>
                      <div className="password-input-container">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          name="password"
                          placeholder="Example123"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="password-visibility-toggle" onClick={togglePasswordVisibility}>
                          {passwordVisible ? ( <VisibilityOffIcon /> ) : ( <VisibilityIcon /> )}
                        </div>
                      </div>
                    </div>

                    <div className="login-forgotpass">
                      <label>Forgot password?</label>
                    </div>
                  </div>
                  <button type="submit" className="login-button">
                    Sign In
                  </button>
                  <div className="signup">
                    <label>
                      Don't have an account? <Link to="/signup" className="clickable">Sign Up</Link>
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 
export default Login;
