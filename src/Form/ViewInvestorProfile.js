import { useState, useRef } from 'react';
import { Box, Typography, TextField, Avatar, Select, MenuItem, Grid, FormControl, Card, CardContent, Button} from '@mui/material';
import axios from 'axios';

function ViewInvestorProfile() {
    const [avatar, setAvatar] = useState('');
    const fileInputRef = useRef(null);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [contactInformation, setContactInformation] = useState('');
    const [gender, setGender] = useState('');
    const [biography, setBiography] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [website, setWebsite] = useState('');
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    
    const industries = [
        "Technology", "Healthcare", "Finance", "Education", "Hospitality",
        "Retail", "Automotive", "Entertainment", "Manufacturing", "Real Estate",
        "Food and Beverage", "Travel", "Fashion", "Telecommunications", "Energy",
        "Media", "Construction", "Agriculture", "Transportation", "Pharmaceuticals",
        "Environmental", "Fitness", "Consulting", "Government", "Non-profit",
        "Insurance", "Legal", "Marketing", "E-commerce", "Sports", "Beauty",
        "Design", "Software", "Hardware", "Biotechnology", "Artificial Intelligence",
        "Space", "Renewable Energy", "Cybersecurity", "Blockchain", "Gaming"
    ];

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreateProfile = async () => {
        try {
            const profileData = {
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                contactInformation: contactInformation,
                gender: gender,
                biography: biography,
                streetAddress: streetAddress,
                country: country,
                city: city,
                state: state,
                postalCode: postalCode,
                website: website,
                facebook: facebook,
                twitter: twitter,
                instagram: instagram,
                linkedIn: linkedIn,
            };

            const endpoint = 'http://localhost:3000/investors/create';

            await axios.post(endpoint, profileData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
        } catch (error) {
            console.error('Failed to create profile:', error);
        }
    };

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, width: '100%', overflowX: 'hidden', maxWidth: '1000px',  background: '#F2F2F2'}}>
                <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                    Upload Business Profile
                </Typography>

                <Grid item xs={12} sm={3}>
                    <label htmlFor="avatar-upload" onClick={handleAvatarClick}>
                        <Avatar sx={{ width: 200, height: 200, mb: 2, ml: 49.5,cursor: 'pointer', border: '5px rgba(0, 116, 144, 1) solid' }} src={avatar}></Avatar>
                    </label>
                
                    <input
                    type="file"
                    accept="image/*"
                    id="avatar-upload"
                    onChange={handleAvatarChange}
                    ref={fileInputRef}
                    style={{ display: 'none'}}/>                      
                </Grid>

                <Box component="main" sx={{mr: 5, borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                        Profile Type
                    </Typography>

                    <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pb: 3 }}>
                        Overview
                    </Typography>
                
                    <Grid container spacing={3} sx={{ ml: 2 }}>
                        <Grid item xs={12} sm={11.4}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <label>First Name</label>
                                    <TextField fullWidth variant="filled" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                </Grid>

                                <Grid item xs={6}>
                                    <label>Last Name</label>
                                    <TextField fullWidth variant="filled" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <label>Email Address</label>
                                    <TextField fullWidth variant="filled" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}/>
                                </Grid>

                                <Grid item xs={6}>
                                    <label>Contact Information</label>
                                    <TextField fullWidth variant="filled" value={contactInformation} onChange={(e) => setContactInformation(e.target.value)}/>
                                </Grid>

                                <Grid item xs={6}>
                                    <label>Gender</label>
                                    <Select fullWidth variant="filled" value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <MenuItem value={'male'}>Male</MenuItem>
                                        <MenuItem value={'female'}>Female</MenuItem>
                                        <MenuItem value={'neutral'}>Neutral</MenuItem>
                                        <MenuItem value={'other'}>Other</MenuItem>
                                    </Select>
                                </Grid>

                                <Grid item xs={12}>
                                    <label>Biography</label>
                                    <TextField fullWidth variant="filled" multiline rows={4} value={biography} onChange={(e) => setBiography(e.target.value)}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                        Location
                    </Typography>

                    <Grid container spacing={3} sx={{ ml: 2 }}>
                        <Grid item xs={12} sm={11.4}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <label>Street Address</label>
                                    <TextField fullWidth variant="filled" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)}/>
                                </Grid>

                                <Grid item xs={4}>
                                    <label>Country</label>
                                    <TextField fullWidth variant="filled" value={country} onChange={(e) => setCountry(e.target.value)}/>
                                </Grid>

                                <Grid item xs={4}>
                                    <label>City</label>
                                    <TextField fullWidth variant="filled" value={city} onChange={(e) => setCity(e.target.value)}/>
                                </Grid>

                                <Grid item xs={4}>
                                    <label>State</label>
                                    <TextField fullWidth variant="filled" value={state} onChange={(e) => setState(e.target.value)}/>
                                </Grid>

                                <Grid item xs={4}>
                                    <label>Postal/Zip Code</label>
                                    <TextField fullWidth variant="filled" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                        Links
                    </Typography>

                    <Grid container spacing={3} sx={{ ml: 2, mb: 2 }}>
                        <Grid item xs={12} sm={11.4}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <label>Website</label>
                                    <TextField fullWidth variant="filled" value={website} onChange={(e) => setWebsite(e.target.value)}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <label>Facebook</label>
                                    <TextField fullWidth variant="filled" value={facebook} onChange={(e) => setFacebook(e.target.value)}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <label>Twitter</label>
                                    <TextField fullWidth variant="filled" value={twitter} onChange={(e) => setTwitter(e.target.value)}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <label>Instagram</label>
                                    <TextField fullWidth variant="filled" value={instagram} onChange={(e) => setInstagram(e.target.value)}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <label>LinkedIn</label>
                                    <TextField fullWidth variant="filled" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Button variant="contained" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' }}} style={{marginLeft: '85%'}} onClick={handleCreateProfile}>
                        Edit Profile
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default ViewInvestorProfile;
