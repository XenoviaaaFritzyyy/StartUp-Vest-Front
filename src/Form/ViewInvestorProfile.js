import { useState, useRef } from 'react';
import countries from '../static/countries';
import { Box, Typography, TextField, Avatar, Select, MenuItem, Grid, FormControl, Card, CardContent, Button, Autocomplete} from '@mui/material';
import axios from 'axios';

function ViewInvestorProfile({ profile }) {
    const [avatar, setAvatar] = useState('');
    const fileInputRef = useRef(null);

    const [isEditable, setIsEditable] = useState(false);

    const [firstName, setFirstName] = useState(profile ? profile.firstName : '');
    const [lastName, setLastName] = useState(profile ? profile.lastName : '');
    const [emailAddress, setEmailAddress] = useState(profile ? profile.emailAddress : '');
    const [contactInformation, setContactInformation] = useState(profile ? profile.contactInformation : '');
    const [gender, setGender] = useState(profile ? profile.gender : '');
    const [biography, setBiography] = useState(profile ? profile.biography : '');
    const [streetAddress, setStreetAddress] = useState(profile ? profile.streetAddress : '');
    const [country, setCountry] = useState(profile ? profile.country : '');
    const [city, setCity] = useState(profile ? profile.city : '');
    const [state, setState] = useState(profile ? profile.state : '');
    const [postalCode, setPostalCode] = useState(profile ? profile.postalCode : '');
    const [website, setWebsite] = useState(profile ? profile.website : '');
    const [facebook, setFacebook] = useState(profile ? profile.facebook : '');
    const [twitter, setTwitter] = useState(profile ? profile.twitter : '');
    const [instagram, setInstagram] = useState(profile ? profile.instagram : '');
    const [linkedIn, setLinkedIn] = useState(profile ? profile.linkedIn : '');

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

    const handleUpdateProfile = async () => {
        if (isEditable) {
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

            const endpoint = `http://localhost:3000/investors/${profile.id}`; // replace with the id of the profile

        await axios.put(endpoint, profileData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    }
    setIsEditable(!isEditable);
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
                                    <label>First Name *</label>
                                    <TextField fullWidth variant="filled" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={!isEditable}/>
                                </Grid>

                                <Grid item xs={6}>
                                    <label>Last Name *</label>
                                    <TextField fullWidth variant="filled" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={!isEditable}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <label>Email Address *</label>
                                    <TextField fullWidth variant="filled" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} disabled={!isEditable}/>
                                </Grid>

                                <Grid item xs={6}>
                                    <label>Contact Information *</label>
                                    <TextField fullWidth variant="filled" value={contactInformation} onChange={(e) => setContactInformation(e.target.value)} disabled={!isEditable}/>
                                </Grid>

                                <Grid item xs={6}>
                                    <label>Gender *</label>
                                    <Select fullWidth variant="filled" value={gender} onChange={(e) => setGender(e.target.value)} disabled={!isEditable}>
                                        <MenuItem value={'male'}>Male</MenuItem>
                                        <MenuItem value={'female'}>Female</MenuItem>
                                        <MenuItem value={'neutral'}>Neutral</MenuItem>
                                        <MenuItem value={'other'}>Other</MenuItem>
                                    </Select>
                                </Grid>

                                <Grid item xs={12}>
                                    <label>Biography *</label>
                                    <TextField fullWidth variant="filled" multiline rows={4} value={biography} onChange={(e) => setBiography(e.target.value)} disabled={!isEditable}/>
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
                                    <label>Street Address *</label>
                                    <TextField fullWidth variant="filled" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} disabled={!isEditable}/>
                                </Grid>

                                <Grid item xs={4}>
                                    <label>Country *</label>
                                    <Autocomplete
                                        options={countries}
                                        getOptionLabel={(option) => option.label}
                                        value={countries.find(c => c.label === country) || null}
                                        onChange={(event, newValue) => {
                                            setCountry(newValue ? newValue.label : '');
                                        }}
                                        renderOption={(props, option) => (
                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                <img
                                                    loading="lazy"
                                                    width="20"
                                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                    alt=""
                                                />
                                                {option.label} ({option.code}) +{option.phone}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                variant="filled"
                                                label="Choose a country"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password',
                                                }}
                                                disabled={!isEditable}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <label>City *</label>
                                    <TextField fullWidth variant="filled" value={city} onChange={(e) => setCity(e.target.value)} disabled={!isEditable}/>
                                </Grid>

                                <Grid item xs={4}>
                                    <label>State *</label>
                                    <TextField fullWidth variant="filled" value={state} onChange={(e) => setState(e.target.value)} disabled={!isEditable}/>
                                </Grid>

                                <Grid item xs={4}>
                                    <label>Postal/Zip Code *</label>
                                    <TextField fullWidth variant="filled" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} disabled={!isEditable}/>
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
                                    <TextField fullWidth variant="filled" value={website} onChange={(e) => setWebsite(e.target.value)} disabled={!isEditable}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <label>Facebook</label>
                                    <TextField fullWidth variant="filled" value={facebook} onChange={(e) => setFacebook(e.target.value)} disabled={!isEditable}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <label>Twitter</label>
                                    <TextField fullWidth variant="filled" value={twitter} onChange={(e) => setTwitter(e.target.value)} disabled={!isEditable}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <label>Instagram</label>
                                    <TextField fullWidth variant="filled" value={instagram} onChange={(e) => setInstagram(e.target.value)} disabled={!isEditable}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <label>LinkedIn</label>
                                    <TextField fullWidth variant="filled" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} disabled={!isEditable}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Button variant="contained" sx={{ mt: 3, width: 150, background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' } }} style={{marginLeft: '85%'}} onClick={handleUpdateProfile}>
                        {isEditable ? 'Save Changes' : 'Edit Profile'}
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default ViewInvestorProfile;
