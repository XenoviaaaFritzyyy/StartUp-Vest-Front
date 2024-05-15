import { useState, useRef } from 'react';
import { Box, Typography, TextField, Avatar, Select, MenuItem, Grid, FormControl, Card, CardContent, Button} from '@mui/material';
import axios from 'axios';

function ViewStartupProfile() {
    const [avatar, setAvatar] = useState('');
    const fileInputRef = useRef(null);

    const [foundedDay, setFoundedDay] = useState('');
    const [foundedMonth, setFoundedMonth] = useState('');
    const [foundedYear, setFoundedYear] = useState(''); 
    const [typeOfCompany, setTypeOfCompany] = useState('');
    const [numberOfEmployees, setNumberOfEmployees] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [industry, setIndustry] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
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

    const days = [...Array(31).keys()].map(i => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => {
        return new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2000, i, 1));
    });
    const years = [...Array(51).keys()].map(i => new Date().getFullYear() - i);
    
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
            companyName: companyName,
            companyDescription: companyDescription,
            foundedDate: `${foundedMonth} ${foundedDay}, ${foundedYear}`,
            typeOfCompany: typeOfCompany,
            numberOfEmployees: numberOfEmployees,
            phoneNumber: phoneNumber,
            contactEmail: contactEmail,
            industry: industry,
          };
      
          const endpoint = 'http://localhost:3000/startups/create';
      
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
                Overview
            </Typography>

            <Grid container spacing={3} sx={{ ml: 2 }}>
                <Grid item xs={12} sm={11.4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <label>Company Name</label>
                            <TextField 
                                fullWidth 
                                variant="filled"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}/>
                        </Grid>

                        <Grid item xs={12}>
                            <label>Company Description</label>
                            <TextField
                                fullWidth
                                variant="filled"
                                value={companyDescription}
                                onChange={(e) => setCompanyDescription(e.target.value)}
                                multiline
                                rows={4}/>
                        </Grid>

                    <Grid item xs={4}>
                        <label><b>Founded Date</b><br/>Month</label>
                        <FormControl fullWidth variant="filled">
                            <Select
                                labelId="month-label"
                                value={foundedMonth}
                                onChange={(e) => setFoundedMonth(e.target.value)}
                            >  
                                {months.map((month) => (
                                    <MenuItem key={month} value={month}>{month}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <label><br/>Day</label>
                        <FormControl fullWidth variant="filled">
                            <Select
                                labelId="day-label"
                                value={foundedDay}
                                onChange={(e) => setFoundedDay(e.target.value)}
                                >
                                {days.map((day) => (
                                    <MenuItem key={day} value={day}>{day}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                    <label><br/>Year</label>
                    <FormControl fullWidth variant="filled">
                        <Select
                            labelId="year-label"
                            value={foundedYear}
                            onChange={(e) => setFoundedYear(e.target.value)}>
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <label>Type of Company</label>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>  
                            <Select 
                                fullWidth 
                                variant="filled"
                                value={typeOfCompany}
                                onChange={(e) => setTypeOfCompany(e.target.value)}
                            >
                                <MenuItem value={'profit'}>Profit</MenuItem>
                                <MenuItem value={'non-profit'}>Non-Profit</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <label>No. of Employees</label>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>  
                            <Select 
                                fullWidth 
                                variant="filled"
                                value={numberOfEmployees}
                                onChange={(e) => setNumberOfEmployees(e.target.value)}
                            >
                                <MenuItem value={'lessthan10'}>less than 10</MenuItem>
                                <MenuItem value={'10-50'}>10-50</MenuItem>
                                <MenuItem value={'50-100'}>50-100</MenuItem>
                                <MenuItem value={'100 above'}>100 above</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <label>Phone Number</label>
                        <TextField fullWidth variant="filled" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} inputProps={{ min: 0, step: 1, pattern: "\\d{11}" }} />
                </Grid>

                <Grid item xs={12}>
                    <label>Contact Email</label>
                        <TextField fullWidth variant="filled" type='email' value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}/>
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
            Industries
        </Typography>

        <Grid container spacing={3} sx={{ ml: 2 }}>
        <Grid item xs={12} sm={11.4}>
            <Grid container spacing={2}>
            <Grid item xs={12}>  
                <Select fullWidth variant="filled" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                {industries.map(industry => (
                    <MenuItem key={industry} value={industry}>{industry}</MenuItem>
                ))}
                </Select>
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

export default ViewStartupProfile;
