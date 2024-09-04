import { useState } from 'react';
import countries from '../static/countries';
import industries from '../static/industries';
import SuccessCreateBusinessProfileDialog from '../Dialogs/SuccessCreateBusinessProfileDialog';
import { Box, Typography, TextField, Select, MenuItem, Grid, FormControl, Card, CardContent, Button, Autocomplete, FormHelperText } from '@mui/material';
import axios from 'axios';

function CreateBusinessProfile() {
  const [selectedProfileType, setSelectedProfileType] = useState(null);

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
  const [foundedDay, setFoundedDay] = useState('');
  const [foundedMonth, setFoundedMonth] = useState('');
  const [foundedYear, setFoundedYear] = useState('');
  const [typeOfCompany, setTypeOfCompany] = useState('');
  const [numberOfEmployees, setNumberOfEmployees] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [industry, setIndustry] = useState('');

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  // Error State Variables
  const [errors, setErrors] = useState({});

  const days = [...Array(31).keys()].map(i => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => {
    return new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2000, i, 1));
  });
  const years = [...Array(51).keys()].map(i => new Date().getFullYear() - i);

  const handleCardClick = (cardType) => {
    setSelectedProfileType(cardType);
  };

  const validateFields = () => {
    const requiredErrorMessage = 'This field cannot be empty.';
    const newErrors = {};

    if (selectedProfileType === 'Startup Company') {
      if (!companyName) newErrors.companyName = requiredErrorMessage;
      if (!companyDescription) newErrors.companyDescription = requiredErrorMessage;
      if (!foundedMonth) newErrors.foundedMonth = requiredErrorMessage;
      if (!foundedDay) newErrors.foundedDay = requiredErrorMessage;
      if (!foundedYear) newErrors.foundedYear = requiredErrorMessage;
      if (!typeOfCompany) newErrors.typeOfCompany = requiredErrorMessage;
      if (!numberOfEmployees) newErrors.numberOfEmployees = requiredErrorMessage;
      if (!phoneNumber) newErrors.phoneNumber = requiredErrorMessage;
      if (!contactEmail) newErrors.contactEmail = requiredErrorMessage;
    } else if (selectedProfileType === 'Investor') {
      if (!firstName) newErrors.firstName = requiredErrorMessage;
      if (!lastName) newErrors.lastName = requiredErrorMessage;
      if (!emailAddress) newErrors.emailAddress = requiredErrorMessage;
      if (!contactInformation) newErrors.contactInformation = requiredErrorMessage;
      if (!gender) newErrors.gender = requiredErrorMessage;
      if (!biography) newErrors.biography = requiredErrorMessage;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleCreateProfile = async () => {
    if (!validateFields()) return; 

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
        companyName: companyName,
        companyDescription: companyDescription,
        foundedDate: `${foundedMonth} ${foundedDay}, ${foundedYear}`,
        typeOfCompany: typeOfCompany,
        numberOfEmployees: numberOfEmployees,
        phoneNumber: phoneNumber,
        contactEmail: contactEmail,
        industry: industry,
      };

      let endpoint;
      if (selectedProfileType === 'Startup Company') {
        endpoint = 'http://localhost:3000/startups/create';
      } else if (selectedProfileType === 'Investor') {
        endpoint = 'http://localhost:3000/investors/create';
      } else {
        throw new Error('Invalid profile type');
      }

      await axios.post(endpoint, profileData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuccessDialogOpen(true);
    } catch (error) {
      console.error('Failed to create profile:', error);
    }
  };    
      
    return (
        <>
        <Box component="main" sx={{ flexGrow: 1, width: '100%', overflowX: 'hidden', maxWidth: '1000px',  background: '#F2F2F2'}}>

            <Box component="main" sx={{mr: 5, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                    Profile Type 
                </Typography>

            <Box sx={{ display: 'flex', gap: 2, pl: 5, pb: 2, textAlign: 'center' }}>
            <Card onClick={() => handleCardClick('Startup Company')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '500px', height: '100px', cursor: 'pointer', border: selectedProfileType === 'Startup Company' ? '3px solid rgba(0, 116, 144, 1)' : '2px solid grey' }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Startup Company
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Click to choose
                    </Typography>
                </CardContent>
            </Card>

            <Card onClick={() => handleCardClick('Investor')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '500px', cursor: 'pointer', border: selectedProfileType === 'Investor' ? '3px solid #007490' : '2px solid grey' }}>
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
                    <Typography variant="h6" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pb: 3     }}>
                        Overview
                    </Typography>

                    <Grid container spacing={3} sx={{ ml: 2 }}>
                        <Grid item xs={12} sm={11.4}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <label>Company Name *</label>
                                    <TextField 
                                        fullWidth 
                                        required
                                        variant="outlined"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}
                                        error={!!errors.companyName} />
                                        {errors.companyName && (<FormHelperText error>{errors.companyName}</FormHelperText>)}
                                </Grid>

                                <Grid item xs={12}>
                                    <label>Company Description *</label>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={companyDescription}
                                        onChange={(e) => setCompanyDescription(e.target.value)}
                                        multiline
                                        rows={4}
                                        error={!!errors.companyDescription}/>
                                        {errors.companyDescription && (<FormHelperText error>{errors.companyDescription}</FormHelperText>)}
                                </Grid>

                            <Grid item xs={4}>
                                <label><b>Founded Date *</b><br/>Month</label>
                                <FormControl fullWidth variant="outlined">
                                    <Select                              
                                        labelId="month-label"
                                        value={foundedMonth}
                                        onChange={(e) => setFoundedMonth(e.target.value)}
                                        sx={{ height: '45px' }}
                                        error={!!errors.foundedMonth}>  
                                        {months.map((month) => (
                                            <MenuItem key={month} value={month}>{month}</MenuItem>
                                        )) 
                                        }
                                    </Select>
                                </FormControl>
                                {errors.foundedMonth && (<FormHelperText error>{errors.foundedMonth}</FormHelperText>)}
                            </Grid>

                            <Grid item xs={4}>
                                <label><br/>Day</label>
                                <FormControl fullWidth variant="outlined">
                                    <Select
                                        labelId="day-label"
                                        value={foundedDay}
                                        onChange={(e) => setFoundedDay(e.target.value)}
                                        sx={{ height: '45px' }}
                                        error={!!errors.foundedDay}>
                                        {days.map((day) => (
                                            <MenuItem key={day} value={day}>{day}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                            <label><br/>Year</label>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    labelId="year-label"
                                    value={foundedYear}
                                    onChange={(e) => setFoundedYear(e.target.value)}
                                    sx={{ height: '45px' }}
                                    error={!!errors.foundedYear}>
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
                                        variant="outlined"
                                        value={typeOfCompany}
                                        onChange={(e) => setTypeOfCompany(e.target.value)}
                                        sx={{ height: '45px' }}
                                        error={!!errors.typeOfCompany}>
                                        <MenuItem value={'profit'}>Profit</MenuItem>
                                        <MenuItem value={'non-profit'}>Non-Profit</MenuItem>
                                    </Select>
                                    {errors.typeOfCompany && (<FormHelperText error>{errors.typeOfCompany}</FormHelperText>)}
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={4}>
                            <label>No. of Employees *</label>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>  
                                    <Select 
                                        fullWidth 
                                        variant="outlined"
                                        value={numberOfEmployees}
                                        onChange={(e) => setNumberOfEmployees(e.target.value)}
                                        sx={{ height: '45px' }}
                                        error={!!errors.numberOfEmployees}>
                                        <MenuItem value={'lessthan10'}>less than 10</MenuItem>
                                        <MenuItem value={'10-50'}>10-50</MenuItem>
                                        <MenuItem value={'50-100'}>50-100</MenuItem>
                                        <MenuItem value={'100 above'}>100 above</MenuItem>
                                    </Select>
                                    {errors.typeOfCompany && (<FormHelperText error>{errors.typeOfCompany}</FormHelperText>)}
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={4}>
                            <label>Phone Number *</label>
                                <TextField fullWidth variant="outlined" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} inputProps={{ min: 0, step: 1, pattern: "\\d{11}" }} 
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}
                                    error={!!errors.phoneNumber} />
                                {errors.typeOfCompany && (<FormHelperText error>{errors.typeOfCompany}</FormHelperText>)}
                        </Grid>

                        <Grid item xs={12}>
                            <label>Contact Email *</label>
                                <TextField fullWidth variant="outlined" type='email' value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}
                                    error={!!errors.contactEmail} />
                                    {errors.contactEmail && (<FormHelperText error>{errors.contactEmail}</FormHelperText>)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Typography variant="h6" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                    Location
                </Typography>

                <Grid container spacing={3} sx={{ ml: 2 }}>
                    <Grid item xs={12} sm={11.4}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <label>Street Address *</label>
                                <TextField fullWidth variant="outlined" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)}
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }} s/>
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
                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}/>
                                            {option.label} ({option.code}) +{option.phone}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            variant="outlined"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}/>
                                    )}
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px'} }}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <label>City *</label>
                                <TextField fullWidth variant="outlined" value={city} onChange={(e) => setCity(e.target.value)}
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>State *</label>
                                <TextField fullWidth variant="outlined" value={state} onChange={(e) => setState(e.target.value)}
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>Postal/Zip Code *</label>
                                <TextField fullWidth variant="outlined" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Typography variant="h6" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                    Industry
                </Typography>

                <Grid container spacing={3} sx={{ ml: 2 }}>
                    <Grid item xs={12} sm={11.4}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>  
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    labelId="industry-label"
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }} >
                                    {industries.map(industry => (
                                        <MenuItem key={industry} value={industry}>{industry}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Typography variant="h6" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                    Links
                </Typography>

                <Grid container spacing={3} sx={{ ml: 2, mb: 2 }}>
                    <Grid item xs={12} sm={11.4}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <label>Website</label>
                                <TextField fullWidth variant="outlined" value={website} onChange={(e) => setWebsite(e.target.value)}
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>Facebook</label>
                                <TextField fullWidth variant="outlined" value={facebook} onChange={(e) => setFacebook(e.target.value)} sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>Twitter</label>
                                <TextField fullWidth variant="outlined" value={twitter} onChange={(e) => setTwitter(e.target.value)}
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>Instagram</label>
                                <TextField fullWidth variant="outlined"value={instagram} onChange={(e) => setInstagram(e.target.value)} sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>LinkedIn</label>
                                <TextField fullWidth variant="outlined"value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Button variant="contained" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' }}} style={{marginLeft: '74.5%'}} onClick={handleCreateProfile}>
                    Create Business Profile
                </Button>
            </>
        )}

            {selectedProfileType === 'Investor' && (
                <>
                    <Typography variant="h6" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pb: 3 }}>
                        Overview
                    </Typography>
                
                    <Grid container spacing={3} sx={{ ml: 2 }}>
                    <Grid item xs={12} sm={11.4}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <label>First Name</label>
                                <TextField fullWidth variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' }}}
                                error={!!errors.firstName}/>
                                {errors.firstName && (<FormHelperText error>{errors.firstName}</FormHelperText>)}
                            </Grid>

                            <Grid item xs={6}>
                                <label>Last Name</label>
                                <TextField fullWidth variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} 
                                sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' }}}
                                error={!!errors.lastName}/>
                                {errors.lastName && (<FormHelperText error>{errors.lastName}</FormHelperText>)}
                            </Grid>

                            <Grid item xs={12}>
                                <label>Email Address</label>
                                <TextField fullWidth variant="outlined" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} 
                                sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' }}}
                                error={!!errors.emailAddress}/>
                                {errors.emailAddress && (<FormHelperText error>{errors.emailAddress}</FormHelperText>)}
                            </Grid>

                            <Grid item xs={6}>
                                <label>Contact Information</label>
                                <TextField fullWidth variant="outlined" value={contactInformation} onChange={(e) => setContactInformation(e.target.value)} 
                                sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' }}}
                                error={!!errors.contactInformation}/>
                                {errors.contactInformation && (<FormHelperText error>{errors.contactInformation}</FormHelperText>)}
                            </Grid>

                            <Grid item xs={6}>
                                <label>Gender</label>
                                    <Select fullWidth variant="outlined" value={gender} onChange={(e) => setGender(e.target.value)}
                                        sx={{ height: '45px',}}
                                        error={!!errors.gender}>
                                        <MenuItem value={'male'}>Male</MenuItem>
                                        <MenuItem value={'female'}>Female</MenuItem>
                                        <MenuItem value={'neutral'}>Neutral</MenuItem>
                                        <MenuItem value={'other'}>Other</MenuItem>
                                    </Select>
                                    {errors.gender && (<FormHelperText error>{errors.gender}</FormHelperText>)}
                            </Grid>

                            <Grid item xs={12}>
                                <label>Biography</label>
                                <TextField fullWidth variant="outlined" multiline rows={4} value={biography} onChange={(e) => setBiography(e.target.value)}
                                error={!!errors.biography} />
                                {errors.biography && (<FormHelperText error>{errors.biography}</FormHelperText>)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Typography variant="h6" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                    Location
                </Typography>

                <Grid container spacing={3} sx={{ ml: 2 }}>
                    <Grid item xs={12} sm={11.4}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <label>Street Address</label>
                                <TextField fullWidth variant="outlined" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' }}}/>
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
                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`} />
                                            {option.label} ({option.code}) +{option.phone}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            variant="outlined"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}
                                        />
                                    )}
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px'}, }}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <label>City</label>
                                <TextField fullWidth variant="outlined" value={city} onChange={(e) => setCity(e.target.value)} sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' },}}/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>State</label>
                                <TextField fullWidth variant="outlined" value={state} onChange={(e) => setState(e.target.value)} sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' }, }}/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>Postal/Zip Code</label>
                                <TextField fullWidth variant="outlined" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Typography variant="h6" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                    Links
                </Typography>

                <Grid container spacing={3} sx={{ ml: 2, mb: 2 }}>
                    <Grid item xs={12} sm={11.4}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <label>Website</label>
                                <TextField fullWidth variant="outlined" value={website} onChange={(e) => setWebsite(e.target.value)} sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' }}}/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>Facebook</label>
                                <TextField fullWidth variant="outlined" value={facebook} onChange={(e) => setFacebook(e.target.value)} sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' }}}/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>Twitter</label>
                                <TextField fullWidth variant="outlined" value={twitter} onChange={(e) => setTwitter(e.target.value)} sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>Instagram</label>
                                <TextField fullWidth variant="outlined" value={instagram} onChange={(e) => setInstagram(e.target.value)} sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' }}}/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>LinkedIn</label>
                                <TextField fullWidth variant="outlined" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Button variant="contained" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' }}} style={{marginLeft: '74.5%'}} onClick={handleCreateProfile} onClose={handleCreateProfile}>
                    Create Business Profile
                </Button>
            </>
        )}
            </Box>
        </Box>

        {/* Success Dialog */}
        <SuccessCreateBusinessProfileDialog
            open={successDialogOpen}
            onClose={() => setSuccessDialogOpen(false)}
            companyName={companyName}/>
        </>
    );
}

export default CreateBusinessProfile;