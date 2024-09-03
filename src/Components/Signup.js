import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Signup() {
  const [errMsg, setErrMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState(''); // New state for managing email input
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      firstName: e.target.elements.firstName.value,
      lastName: e.target.elements.lastName.value,
      email: e.target.elements.email.value,
      contactNumber: e.target.elements.contactNumber.value,
      gender: e.target.elements.gender.value,
      password: e.target.elements.password.value,
    };

    // Enhanced Email Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        setErrMsg('Please enter a valid email address with a domain (e.g., .com, .net).');
        return;
    } else {
        setErrMsg(''); // Clear error if email is valid
    }

    // Validate password strength using regex
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(userData.password)) {
      setPasswordError(
        'Password must be at least 8 characters long, contain an uppercase, lowercase letter, number, and a special character.'
      );
      return;
    } else {
      setPasswordError('');
    }

    // Check if email already exists before submitting
    if (emailExists) {
      setErrMsg('Email already exists. Please enter a different email.');
      return; // Do not proceed if the email already exists
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/users/register',
        userData
      );
      console.log('Signup successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      setErrMsg('Signup failed. Please try again.');
    }
  };

  const checkEmailExists = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/check-email', {
        email,
      });
      setEmailExists(response.data.exists);
      setErrMsg(response.data.exists ? 'Email already exists. Please enter a different email.' : '');
    } catch (error) {
      console.error('Error checking email:', error);
      setErrMsg('Error checking email. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sm={1}
          sx={{
            background: '#007490',
            borderRadius: '0 10px 10px 0',
            boxShadow: '10px 3px 8px rgba(0,0,0,.15)',
          }}
        ></Grid>

        <Grid
          item
          xs={12}
          sm={6}
          sx={{ textAlign: 'center', color: '#007490', mt: 8 }}
        >
          <Typography sx={{ fontSize: '4.5em', fontWeight: 'bold' }}>
            "Empowering <br /> Startups, <br /> Tracking <br /> Investments"
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            p: 6,
            background: 'rgba(0, 116, 144, 1)',
            borderRadius: 2,
            boxShadow: '10px 3px 8px rgba(0,0,0,.15)',
          }}
        >
          <Typography
            variant="h5"
            component="header"
            sx={{ fontWeight: 'bold', color: '#F2F2F2', pb: 3 }}
          >
            Create Account
          </Typography>
          <form onSubmit={handleSubmit} className="signup-form">
            <Grid container spacing={2} className="signup-details">
              <Grid item xs={6}>
                <Typography sx={{ color: '#F2F2F2' }}>First Name</Typography>
                <TextField
                  fullWidth
                  name="firstName"
                  placeholder="John"
                  required
                  sx={{
                    background: '#F2F2F2',
                    borderRadius: 1,
                    height: '45px',
                    '& .MuiInputBase-root': { height: '45px' },
                    '& .MuiInputBase-input': { padding: '12px 14px' },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#fff',
                    },
                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 30px #F2F2F2 inset',
                      WebkitTextFillColor: '#000',
                    },
                    '& input:-moz-autofill': {
                      boxShadow: '0 0 0 30px #F2F2F2 inset',
                      color: '#000',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography sx={{ color: '#F2F2F2' }}>Last Name</Typography>
                <TextField
                  fullWidth
                  name="lastName"
                  placeholder="Doe"
                  required
                  sx={{
                    background: '#F2F2F2',
                    borderRadius: 1,
                    height: '45px',
                    '& .MuiInputBase-root': { height: '45px' },
                    '& .MuiInputBase-input': { padding: '12px 14px' },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#fff',
                    },
                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 30px #F2F2F2 inset',
                      WebkitTextFillColor: '#000',
                    },
                    '& input:-moz-autofill': {
                      boxShadow: '0 0 0 30px #F2F2F2 inset',
                      color: '#000',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ color: '#F2F2F2' }}>Email</Typography>
                <TextField
                fullWidth
                name="email"
                placeholder="johndoe@gmail.com"
                type="email"
                required
                error={emailExists || !!errMsg}
                helperText={emailExists ? 'Email already exists.' : errMsg}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={checkEmailExists} // Trigger email check on blur
                sx={{
                    background: '#F2F2F2',
                    borderRadius: 1,
                    height: '45px',
                    '& .MuiInputBase-root': { height: '45px' },
                    '& .MuiInputBase-input': { padding: '12px 14px' },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#fff',
                    },
                    '& input:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 30px #F2F2F2 inset',
                    WebkitTextFillColor: '#000',
                    },
                    '& input:-moz-autofill': {
                    boxShadow: '0 0 0 30px #F2F2F2 inset',
                    color: '#000',
                    },
                }}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography sx={{ color: '#F2F2F2' }}>Phone Number</Typography>
                <TextField
                  fullWidth
                  name="contactNumber"
                  placeholder="09362677352"
                  type="tel"
                  required
                  sx={{
                    background: '#F2F2F2',
                    borderRadius: 1,
                    height: '45px',
                    '& .MuiInputBase-root': { height: '45px' },
                    '& .MuiInputBase-input': { padding: '12px 14px' },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#fff',
                    },
                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 30px #F2F2F2 inset',
                      WebkitTextFillColor: '#000',
                    },
                    '& input:-moz-autofill': {
                      boxShadow: '0 0 0 30px #F2F2F2 inset',
                      color: '#000',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography sx={{ color: '#F2F2F2' }}>Gender</Typography>
                <FormControl fullWidth>
                  <Select
                    name="gender"
                    displayEmpty
                    defaultValue=""
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: 1,
                      height: '45px',
                      '& .MuiInputBase-root': { height: '45px' },
                      '& .MuiInputBase-input': { padding: '12px 14px' },
                      '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#fff',
                      },
                      '& input:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 30px #F2F2F2 inset',
                        WebkitTextFillColor: '#000',
                      },
                      '& input:-moz-autofill': {
                        boxShadow: '0 0 0 30px #F2F2F2 inset',
                        color: '#000',
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select Gender
                    </MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ color: '#F2F2F2' }}>Password</Typography>
                <TextField
                  fullWidth
                  name="password"
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  error={!!passwordError}
                  helperText={passwordError}
                  sx={{
                    background: '#F2F2F2',
                    borderRadius: 1,
                    height: '45px',
                    '& .MuiInputBase-root': { height: '45px' },
                    '& .MuiInputBase-input': { padding: '12px 14px' },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#fff',
                    },
                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 30px #F2F2F2 inset',
                      WebkitTextFillColor: '#000',
                    },
                    '& input:-moz-autofill': {
                      boxShadow: '0 0 0 30px #F2F2F2 inset',
                      color: '#000',
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility}>
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    backgroundColor: '#f2f2f2',
                    color: 'rgba(0, 116, 144, 1)',
                    mt: 2,
                    p: 1,
                    fontSize: '1em',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#005a66',
                      color: '#f2f2f2',
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>

          <Typography
            sx={{
              color: '#F2F2F2',
              textAlign: 'center',
              mt: 2,
            }}
          >
            Already have an account? <Link to="/login" style={{ color: '#fff' }}>Log In</Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Signup;
