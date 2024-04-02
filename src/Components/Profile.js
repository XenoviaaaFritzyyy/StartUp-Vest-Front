import { useState } from 'react';
import Navbar from "../Navbar/Navbar";
import CreateBusinessProfile from '../Form/CreateBusinessProfile';
import { Box, Typography, Toolbar, TextField, Avatar, Button, Select, MenuItem, Grid, DialogActions } from '@mui/material';
import CreateFundingRound from '../Form/CreateFundingRound';

const drawerWidth = 240;

function Profile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [avatar, setAvatar] = useState('');

    const [isEditable, setIsEditable] = useState(false);
    const [openCreateBusinessProfile, setCreateBusinessProfile] = useState(false);
    const [openCreateFundingRound, setCreateFundingRound] = useState(false);

    const handleEditClick = () => {
        setIsEditable(!isEditable);
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

    const handleOpenBusinessProfile = () => {
        setCreateBusinessProfile(true);
    };

    const handleCloseBusinessProfile = () => {
        setCreateBusinessProfile(false);
    };

    const handleOpenFundingRound = () => {
        setCreateFundingRound(true);
    };

    const handleCloseFundingRound = () => {
        setCreateFundingRound(false);
    };

    return (
        <>
            <Navbar />
            <Toolbar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, paddingLeft: `${drawerWidth}px`, width: '100%', overflowX: 'hidden' }}>
                <Typography variant="h4" sx={{ paddingLeft: 8, color: '#009688', fontWeight: 'bold' }}>
                    Account Information
                </Typography>

                <Box component="main" sx={{ background: '#F2F2F2', mr: 5, borderRadius: 2, ml: 8, pb: 6, mt: 2 }}>
                    <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 8, pt: 3, pb: 3 }}>
                        Personal Information
                    </Typography>

                    <Grid container spacing={2} sx={{ ml: 6 }}>
                        <Grid item xs={12} sm={3}>
                            <label htmlFor="avatar-upload">
                                <Avatar sx={{ width: 200, height: 200, mt: 4, cursor: 'pointer', border: '5px #009688 solid' }} src={avatar}></Avatar>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="avatar-upload"
                                style={{ display: 'none' }}
                                onChange={handleAvatarChange}
                                disabled={!isEditable}/>

                            <Typography sx={{mt: 1, ml: 6.5, color: '#414a4c'}}>Upload Photo</Typography>
                        </Grid>

                        <Grid item xs={12} sm={7.5}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <label>First Name</label>
                                    <TextField fullWidth variant="filled" value={firstName} onChange={(e) => setFirstName(e.target.value)} InputProps={{ readOnly: !isEditable }} />
                                </Grid>

                                <Grid item xs={6}>
                                    <label>Last Name</label>
                                    <TextField fullWidth variant="filled" value={lastName} onChange={(e) => setLastName(e.target.value)} InputProps={{ readOnly: !isEditable }} />
                                </Grid>

                                <Grid item xs={12}>
                                    <label>Email Address</label>
                                    <TextField fullWidth variant="filled" value={email} onChange={(e) => setEmail(e.target.value)} InputProps={{ readOnly: !isEditable }} />
                                </Grid>

                                <Grid item xs={6}>
                                    <label>Phone Number</label>
                                    <TextField fullWidth variant="filled" value={phone} onChange={(e) => setPhone(e.target.value)} InputProps={{ readOnly: !isEditable }} />
                                </Grid>

                                <Grid item xs={6}>
                                    <label>Gender</label>
                                    <Select fullWidth variant="filled" value={gender} onChange={(e) => setGender(e.target.value)} disabled={!isEditable}>
                                        <MenuItem value={'male'}>Male</MenuItem>
                                        <MenuItem value={'female'}>Female</MenuItem>
                                        <MenuItem value={'neutral'}>Neutral</MenuItem>
                                        <MenuItem value={'other'}>Other</MenuItem>
                                    </Select>
                                </Grid>

                                <Grid item>
                                    <Button variant="contained"
                                        sx={{ ml: 70, mt: 2, background: '#009688', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: '#009688' } }} onClick={handleEditClick}>
                                        {isEditable ? 'Save Changes' : 'Edit Profile'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                
                <Box component="main" sx={{ background: '#F2F2F2', mr: 5, borderRadius: 2, ml: 8, mt: 2, pb: 3, pt: 3, pl:5, pr: 5,  display: 'flex', alignItems: 'center' }}>
                    <Avatar src="/images/business.png" sx={{ marginRight: 2, width: 100, height: 100, border: '3px #009688 solid' }}>H</Avatar>
                    <Typography variant="h6" sx={{ flex: 1, color: '#414a4c', fontWeight: '500', marginRight: 2 }}>
                        Establishing a business profile lends credibility to your venture. Don’t wait, enhance your business’s trustworthiness by creating your profile today!
                    </Typography>
                    
                    <Button variant="contained" sx={{ background: '#009688', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: '#009688' }}} onClick={handleOpenBusinessProfile}>
                        Create Business Profile
                    </Button>
                </Box>

                <Box component="main" sx={{ background: '#F2F2F2', mr: 5, borderRadius: 2, ml: 8, mt: 2, pb: 3, pt: 3, pl:5, pr: 5,  display: 'flex', alignItems: 'center' }}>
                    <Avatar src="/images/funding.jpg" sx={{ marginRight: 2, width: 100, height: 100, border: '3px #009688 solid' }}></Avatar>
                    <Typography variant="h6" sx={{ flex: 1, color: '#414a4c', fontWeight: '500', marginRight: 2 }}>
                        Starting a funding event secures vital support for startups, driving growth <br/>and innovation.
                    </Typography>

                    <Button variant="contained" onClick={handleOpenFundingRound} sx={{ background: '#009688', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: '#009688'}}} >
                        Create Funding Event
                    </Button>
                </Box>
            </Box>

            {/* Custom Full Page Dialog for Creating Business Profile */}
                {openCreateBusinessProfile && (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 1300,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',}}>
                
                    <Box
                        sx={{
                            background: '#F2F2F2',
                            maxidth: '100%',
                            maxHeight: '90%',
                            overflowY: 'auto',
                            boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'}}>

                        <CreateBusinessProfile />

                    <DialogActions>
                        <Box sx={{ display: 'flex', mt: 1, mb: 1,mr: 5}}>
                            <Button variant="text" sx={{ mr: 2 , color: '#009688'}} onClick={handleCloseBusinessProfile}>
                                Cancel
                            </Button>

                            <Button variant="contained" sx={{ background: '#009688', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: '#009688' }}}>
                                Create Profile
                            </Button>
                        </Box>
                    </DialogActions>
                    </Box>
                </Box>
            )}

            {/* Custom Full Page Dialog for Creating Funding Round */}
                {openCreateFundingRound && (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 1300,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'}}>
                
                    <Box
                        sx={{
                            background: '#F2F2F2',
                            maxidth: '100%',
                            maxHeight: '90%',
                            overflowY: 'auto',
                            boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'}}>

                        <CreateFundingRound />

                    <DialogActions>
                        <Box sx={{ display: 'flex', mt: 1, mb: 1,mr: 5}}>
                            <Button variant="text" sx={{ mr: 2 , color: '#009688'}} onClick={handleCloseFundingRound}>
                                Cancel
                            </Button>

                            <Button variant="contained" sx={{ background: '#009688', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: '#009688' }}}>
                                Create Funding Round
                            </Button>
                        </Box>
                    </DialogActions>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default Profile;