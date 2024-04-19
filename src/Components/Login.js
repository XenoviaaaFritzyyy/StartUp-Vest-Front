import React from 'react';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import '../Css/Login.css';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
    } catch (error) {
        console.error('Signup failed:', error);
    }
  };

  return (
    <div className="login-logo-container">      
      <div className="login-container">
        <div className="login-left-container">
          <p className='login-introduction'>Welcome back! <br /> Excited to have you here again. <br />Sign in to get back on track!</p>
          <p className='login-motto'>Empowering Startups, Tracking Investments</p>
          <img src='images/picture.jpg' alt="Startup Vest Logo" className="login-picture" />
        </div>

        <div className="login-right-container">
          <img src='images/logo.png' alt="Startup Vest Logo" className="login-logo" />

          <div className='login-right-container-form'>
            <header className='login-header'>Sign In</header>
            <form onSubmit={handleSubmit} className='login-form'>
              <div className="login-details">
                <div className="details">
                  <div className="fields">
                    <div className="login-input-field">
                      <label>Email*</label>
                      <input type="text" name="email" placeholder="example@gmail.com" required onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="login-input-field">
                      <label>Password*</label>
                      <input type="password" name="password" placeholder="Example123" required onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="login-forgotpass">
                      <label>Forgot password?</label>
                    </div>
                  </div>
                  <button type="submit" className="login-button">Sign In</button>
                  <div className="signup">
                    <label>Don't have an account? <Link to="/signup" className="clickable">Sign Up</Link></label>
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

