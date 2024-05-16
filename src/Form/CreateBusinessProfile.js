import { useState, useRef } from 'react';
import countries from '../static/countries';
import industries from '../static/industries';
import { Box, Typography, TextField, Avatar, Select, MenuItem, Grid, FormControl, Card, CardContent, Button, Autocomplete, InputLabel} from '@mui/material';
import axios from 'axios';

function CreateBusinessProfile() {
    const [selectedProfileType, setSelectedProfileType] = useState(null);
    const [avatar, setAvatar] = useState('');
    const fileInputRef = useRef(null);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    // Profile Form Data Usestates
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
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    // const [foundDate, setFoundDate] = useState('');
    const [foundedDay, setFoundedDay] = useState('');
    const [foundedMonth, setFoundedMonth] = useState('');
    const [foundedYear, setFoundedYear] = useState(''); 
    const [typeOfCompany, setTypeOfCompany] = useState('');
    const [numberOfEmployees, setNumberOfEmployees] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [industry, setIndustry] = useState('');

    // Add a new state variable for the profile type
    // const [profileType, setProfileType] = useState('');

    const days = [...Array(31).keys()].map(i => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => {
        return new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2000, i, 1));
    });
    const years = [...Array(51).keys()].map(i => new Date().getFullYear() - i);
      
    const handleCardClick = (cardType) => {
        setSelectedProfileType(cardType);
    };

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
          // Prepare the data for the profile
          const profileData = {
            // ... fill this with the data from your form ...
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
            companyName: companyName,
            companyDescription: companyDescription,
            foundedDate: `${foundedMonth} ${foundedDay}, ${foundedYear}`,
            typeOfCompany: typeOfCompany,
            numberOfEmployees: numberOfEmployees,
            phoneNumber: phoneNumber,
            contactEmail: contactEmail,
            industry: industry,
          };
      
          // Determine the correct endpoint based on the selected profile type
          let endpoint;
          if (selectedProfileType === 'Startup Company') {
            endpoint = 'http://localhost:3000/startups/create';
          } else if (selectedProfileType === 'Investor') {
            endpoint = 'http://localhost:3000/investors/create';
          } else {
            throw new Error('Invalid profile type');
          }
      
          // Make a POST request to your backend to create the profile
          await axios.post(endpoint, profileData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the JWT is stored in localStorage
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
                Upload Business Profile *
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
                    Profile Type *
                </Typography>

            <Box sx={{ display: 'flex', gap: 2, pl: 5, pb: 5, textAlign: 'center' }}>
            <Card onClick={() => handleCardClick('Startup Company')} style={{ width: '500px', cursor: 'pointer', border: selectedProfileType === 'Startup Company' ? '2px solid rgba(0, 116, 144, 1)' : 'none' }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Startup Company
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Click to choose
                    </Typography>
                </CardContent>
            </Card>

            <Card onClick={() => handleCardClick('Investor')} style={{ width: '500px', cursor: 'pointer', border: selectedProfileType === 'Investor' ? '2px solid rgba(0, 116, 144, 1)' : 'none' }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Investor
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Click to choose
                    </Typography>
                </CardContent>
            </Card>
        </Box>

            {selectedProfileType === 'Startup Company' && (
                <>
                    <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pb: 3 }}>
                        Overview
                    </Typography>

                    <Grid container spacing={3} sx={{ ml: 2 }}>
                        <Grid item xs={12} sm={11.4}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <label>Company Name *</label>
                                    <TextField 
                                        fullWidth 
                                        variant="filled"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <label>Company Description *</label>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        value={companyDescription}
                                        onChange={(e) => setCompanyDescription(e.target.value)}
                                        multiline
                                        rows={4}/>
                                </Grid>

                            <Grid item xs={4}>
                                <label><b>Founded Date *</b><br/>Month</label>
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
                            <label>Type of Company *</label>
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
                            <label>No. of Employees *</label>
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
                            <label>Phone Number *</label>
                                <TextField fullWidth variant="filled" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} inputProps={{ min: 0, step: 1, pattern: "\\d{11}" }} />
                        </Grid>

                        <Grid item xs={12}>
                            <label>Contact Email *</label>
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
                                <label>Street Address *</label>
                                <TextField fullWidth variant="filled" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)}/>
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
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <label>City *</label>
                                <TextField fullWidth variant="filled" value={city} onChange={(e) => setCity(e.target.value)}/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>State *</label>
                                <TextField fullWidth variant="filled" value={state} onChange={(e) => setState(e.target.value)}/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>Postal/Zip Code *</label>
                                <TextField fullWidth variant="filled" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                    Industry *
                </Typography>

                <Grid container spacing={3} sx={{ ml: 2 }}>
                    <Grid item xs={12} sm={11.4}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>  
                            <FormControl fullWidth variant="filled">
                                <InputLabel id="industry-label">Choose an Industry</InputLabel>
                                <Select
                                    labelId="industry-label"
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}>
                                    {industries.map(industry => (
                                        <MenuItem key={industry} value={industry}>{industry}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                                <TextField fullWidth variant="filled"value={instagram} onChange={(e) => setInstagram(e.target.value)}/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>LinkedIn</label>
                                <TextField fullWidth variant="filled"value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Button variant="contained" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' }}} style={{marginLeft: '75%'}} onClick={handleCreateProfile}>
                    Create Business Profile
                </Button>
            </>
        )}

            {selectedProfileType === 'Investor' && (
                <>
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
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}
                                        />
                                    )}
                                />
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
                <Button variant="contained" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' }}} style={{marginLeft: '75%'}} onClick={handleCreateProfile}>
                    Create Business Profile
                </Button>
            </>
        )}
            </Box>
        </Box>
        </>
    );
}

export default CreateBusinessProfile;
