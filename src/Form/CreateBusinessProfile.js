import { useState, useRef } from 'react';

import { Box, Typography, TextField, Avatar, Select, MenuItem, Grid, FormControl, Card, CardContent} from '@mui/material';

function CreateBusinessProfile() {
    const [selectedProfileType, setSelectedProfileType] = useState(null);
    const [avatar, setAvatar] = useState('');
    const fileInputRef = useRef(null);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

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

    return (
        <>
        <Box component="main" sx={{ flexGrow: 1, width: '100%', overflowX: 'hidden', maxWidth: '1000px',  background: '#F2F2F2'}}>

            <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                Upload Business Profile
            </Typography>

            <Grid item xs={12} sm={3}>
                <label htmlFor="avatar-upload" onClick={handleAvatarClick}> {/* Add onClick handler to label */}
                    <Avatar sx={{ width: 200, height: 200, mb: 2, ml: 49.5,cursor: 'pointer', border: '5px #009688 solid' }} src={avatar}></Avatar>
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

            <Box sx={{ display: 'flex', gap: 2, pl: 5, pb: 5, textAlign: 'center' }}>
            <Card onClick={() => handleCardClick('Startup Company')} style={{ width: '500px', cursor: 'pointer', border: selectedProfileType === 'Startup Company' ? '2px solid #009688' : 'none' }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Startup Company
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Click to choose
                    </Typography>
                </CardContent>
            </Card>

            <Card onClick={() => handleCardClick('Investor')} style={{ width: '500px', cursor: 'pointer', border: selectedProfileType === 'Investor' ? '2px solid #009688' : 'none' }}>
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
                                    <label>Company Name</label>
                                    <TextField fullWidth variant="filled"/>
                                </Grid>

                                <Grid item xs={12}>
                                    <label>Company Description</label>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        multiline
                                        rows={4}/>
                                </Grid>

                                <Grid item xs={4}>
                                <label><b>Founded Date</b><br/>Month</label>
                                <FormControl fullWidth variant="filled">
                                    <Select
                                        labelId="month-label"
                                        value={month}
                                        onChange={(e) => setMonth(e.target.value)}>
                                            
                                        {months.map((month) => (
                                        <MenuItem key={month} value={month}>{month}</MenuItem>))}
                                    </Select>
                                </FormControl>
                                </Grid>

                            <Grid item xs={4}>
                                <label><br/>Day</label>
                                <FormControl fullWidth variant="filled">
                                <Select
                                    labelId="day-label"
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}>
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
                                value={year}
                                onChange={(e) => setYear(e.target.value)}>
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
                                    <Select fullWidth variant="filled">
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
                                    <Select fullWidth variant="filled">
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
                                <TextField fullWidth variant="filled" type="tel" inputProps={{ min: 0, step: 1, pattern: "\\d{11}" }} />
                        </Grid>

                        <Grid item xs={12}>
                            <label>Contact Email</label>
                                <TextField fullWidth variant="filled" type='email'/>
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
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>Country</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>City</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>State</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>Postal/Zip Code</label>
                                <TextField fullWidth variant="filled"/>
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
            <Select fullWidth variant="filled">
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
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>Facebook</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>Twitter</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>Instagram</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>LinkedIn</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
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
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={6}>
                                <label>Last Name</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>Email Address</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={6}>
                                <label>Contact Information</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={6}>
                                <label>Gender</label>
                                    <Select fullWidth variant="filled">
                                        <MenuItem value={'male'}>Male</MenuItem>
                                        <MenuItem value={'female'}>Female</MenuItem>
                                        <MenuItem value={'neutral'}>Neutral</MenuItem>
                                        <MenuItem value={'other'}>Other</MenuItem>
                                    </Select>
                            </Grid>

                            <Grid item xs={12}>
                                <label>Biography</label>
                                <TextField fullWidth variant="filled" multiline rows={4}/>
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
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>Country</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>City</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>State</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>Postal/Zip Code</label>
                                <TextField fullWidth variant="filled"/>
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
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>Facebook</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>Twitter</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>Instagram</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={12}>
                                <label>LinkedIn</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        )}
            </Box>
        </Box>
        </>
    );
}

export default CreateBusinessProfile;
