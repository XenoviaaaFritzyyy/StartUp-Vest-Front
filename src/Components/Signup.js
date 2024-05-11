import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { Grid, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Signup() {
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            firstName: e.target.elements.firstName.value,
            lastName: e.target.elements.lastName.value,
            email: e.target.elements.email.value,
            contactNumber: e.target.elements.contactNumber.value,
            gender: e.target.elements.gender.value,
            password: e.target.elements.password.value
        };

        try {
            const response = await axios.post('http://localhost:3000/users/register', userData);
            console.log('Signup successful:', response.data);
            setSuccess(true);
        } catch (error) {
            console.error('Signup failed:', error);
            setErrMsg('Signup failed. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Grid container style={{ minHeight: '85vh', marginTop: '2%' }}>
            <Grid item xs={12} sm={.5} sx={{ background: 'rgba(0, 116, 144, 1)', borderRadius: '0 10px 10px 0' }}>
            </Grid>

            <Grid item xs={12} sm={6.5} sx={{ textAlign: 'center', color: 'rgba(0, 116, 144, 1)', mt: 10 }}>
                <Typography sx={{ fontSize: '5em', fontWeight: 'bold' }}>Empowering <br /> Startups,  <br /> Tracking  <br /> Investments</Typography>
            </Grid>

            <Grid item xs={12} sm={4.5} sx={{ p: 6, background: 'rgba(0, 116, 144, 1)', borderRadius: 2 }}>
                <Typography variant="h5" component="header" sx={{ fontWeight: 'bold', color: '#F2F2F2', pb: 3 }}>Create Account</Typography>
                <form onSubmit={handleSubmit} className='signup-form'>
                    <Grid container spacing={2} className="signup-details">
                        <Grid item xs={6}>
                            <Typography variant="h8" sx={{ color: '#F2F2F2' }}>First Name</Typography>
                            <TextField fullWidth name="firstName" placeholder="John" required sx={{ background: '#F2F2F2', borderRadius: 1 }} />
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h8" sx={{ color: '#F2F2F2' }}>Last Name</Typography>
                            <TextField fullWidth name="lastName" placeholder="Doe" required sx={{ background: '#F2F2F2', borderRadius: 1 }} />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h8" sx={{ color: '#F2F2F2' }}>Email</Typography>
                            <TextField fullWidth name="email" placeholder="johndoe@gmail.com" type="email" required sx={{ background: '#F2F2F2', borderRadius: 1 }} />
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h8" sx={{ color: '#F2F2F2' }}>Phone Number</Typography>
                            <TextField fullWidth name="contactNumber" placeholder="09362677352" type="tel" required sx={{ background: '#F2F2F2', borderRadius: 1 }} />
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h8" sx={{ color: '#F2F2F2' }}>Gender</Typography>
                            <FormControl fullWidth>
                                <Select labelId="gender-label" id="gender" name="gender" sx={{ background: '#F2F2F2', borderRadius: 1 }}>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Neutral">Neutral</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h8" sx={{ color: '#F2F2F2' }}>Password</Typography>
                            <TextField
                                fullWidth
                                name="password"
                                placeholder="Example123"
                                type={showPassword ? 'text' : 'password'}
                                required
                                sx={{ background: '#F2F2F2', borderRadius: 1 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" sx={{ mt: 1, width: '100%', height: '50px', color: 'rgba(0, 116, 144, 1)', background: '#F2F2F2', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: '#F2F2F2' } }}>
                                Sign Up
                            </Button>
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Typography variant="h7" sx={{ color: '#F2F2F2' }}>
                                Already have an account? <Link to="/" style={{ color: '#FFFFFF' }}>Sign In</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}

export default Signup;
