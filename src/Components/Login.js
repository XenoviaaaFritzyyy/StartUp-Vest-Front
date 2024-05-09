import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Typography, TextField, Button, Link, Paper, IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.jwt);
      console.log('Login successful:', response.data);
      setLoggedIn(true);
      navigate('/userdashboard');
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

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Grid container>
        <Grid item xs={12} sm={7} textAlign="center">
          <Paper elevation={3} sx={{ pt: 8, pb: 5, background: 'rgba(0, 116, 144, 1)' }}>
            <Typography variant="h4" sx={{ color: '#F2F2F2', fontWeight: 'bold' }}>
              Welcome back! <br />
              Excited to have you again. <br />
              Sign in to get back on track!
            </Typography>

            <Typography variant="h5" sx={{ mt: 3, mb: 3, color: '#F2F2F2' }}>Empowering Startups, Tracking Investments</Typography>
            <img src="images/picture.jpg" alt="Startup Vest Logo" style={{ width: '70%', maxWidth: '100%', boxShadow: '0 5px 10px rgba(0,0,0,.3)', borderRadius: 4 }} />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={5} paddingX={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img src="images/logo.png" alt="Logo" style={{ width: '80%', marginBottom: '10px', maxWidth: '100%' }} />
          <Paper elevation={3} style={{ padding: '50px', position: 'relative', width: '75%', maxWidth: '400px' }}>
            <form onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ textAlign: 'center', mb: 2, color: 'rgba(0, 116, 144, 1)', fontWeight: 'bold' }}>Sign In</Typography>

              <Typography variant="h8" sx={{ color: 'rgba(0, 116, 144, 1)' }}>Email</Typography>
              <TextField type="text" placeholder="johndoe@gmail.com" required value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailExists(false);
                }} onBlur={isEmailRegistered} fullWidth margin="normal" />

              <Typography variant="h8" sx={{ color: 'rgba(0, 116, 144, 1)' }}>Password</Typography>
              <TextField
                type={showPassword ? 'text' : 'password'}
                placeholder="Example123"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}/>

              <Typography variant="body2" sx={{ textAlign: 'right', cursor: 'pointer', color: 'rgba(0, 116, 144, 1)' }}>
                Forgot password?
              </Typography>

              <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, width: '100%', background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' } }}>
                Sign In
              </Button>

              <div style={{ marginTop: '16px' }}>
                <Typography variant="body2" sx={{ textAlign: 'center', color: 'rgba(0, 116, 144, 1)' }}>
                  Don't have an account? <Link component={RouterLink} to="/signup" sx={{ color: 'rgba(0, 116, 144, 1)', fontWeight: 'bold' }}>Sign Up</Link>
                </Typography>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
