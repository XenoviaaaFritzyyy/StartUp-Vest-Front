import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import CreateBusinessProfile from '../Form/CreateBusinessProfile';
import ViewStartupProfile from '../Form/ViewStartupProfile';
import ViewInvestorProfile from '../Form/ViewInvestorProfile';

import { Box, Typography, Toolbar, TextField, Avatar, Button, Select, MenuItem, Grid,
        DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContentText, DialogContent } from '@mui/material';

const drawerWidth = 240;

function Profile() {
    const [isEditable, setIsEditable] = useState(false);
    const [openCreateBusinessProfile, setCreateBusinessProfile] = useState(false);
    const [businessProfiles, setBusinessProfiles] = useState([]);
    const [selectedBusinessProfile, setSelectedBusinessProfile] = useState(null);
    const [openViewStartup, setOpenViewStartup] = useState(false);
    const [openViewInvestor, setOpenViewInvestor] = useState(false);

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        gender: '',
        avatar: '',
    });

    // Fetch user data when the component mounts.
    useEffect(() => {
        fetchUserData();
        fetchBusinessProfiles();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users/profile', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
    
        setUserData(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

    const fetchBusinessProfiles = async () => {
        try {
            const responseStartups = await axios.get(`http://localhost:3000/startups`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const responseInvestors = await axios.get(`http://localhost:3000/investors`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

    
            const startups = responseStartups.data.map(profile => ({ ...profile, type: 'Startup' }));
            const investors = responseInvestors.data.map(profile => ({ ...profile, type: 'Investor' }));
    
            setBusinessProfiles([...startups, ...investors]);
        } catch (error) {
            console.error('Failed to fetch business profiles:', error);
        }
    };
    
    const handleEditClick = () => {
        setIsEditable(!isEditable);
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => { setUserData((prevData) => ({...prevData, avatar: reader.result, }));
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

    const handleOpenStartUp = () => {
        setOpenViewStartup(true);
    };

    const handleCloseStartUp = () => {
        setOpenViewStartup(false);
    };

    const handleOpenInvestor = () => {
        setOpenViewInvestor(true);
    };

    const handleCloseInvestor = () => {
        setOpenViewInvestor(false);
    };

    const handleSaveChanges = async () => {
        try {
            await updateUser(userData);
            await fetchUserData();
            setIsEditable(false);
        } catch (error) {
        console.error('Failed to update user data:', error);
        }
    };

    const updateUser = async (userData) => {
        try {
        const response = await axios.put(`http://localhost:3000/users/${userData.id}`, userData, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, },
        });

        console.log('User data updated successfully:', response.data);
            } catch (error) {
        console.error('Failed to update user data:', error);
            throw error;
        }
    };

    return (
        <>
            <Navbar />
            <Toolbar />
            <Box component="main" sx={{ flexGrow: 1, p: 4, paddingLeft: `${drawerWidth}px`, width: '100%', overflowX: 'hidden' }}>
                <Typography variant="h4" sx={{ paddingLeft: 8, color: 'rgba(0, 116, 144, 1)', fontWeight: 'bold' }}>
                    Account Information
                </Typography>

                <Box component="main" sx={{ background: '#F2F2F2', mr: 5, borderRadius: 2, ml: 8, pb: 6, mt: 2 }}>
                    <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 8, pt: 3, pb: 3 }}>
                        Personal Information
                    </Typography>

                    <Grid container spacing={2} sx={{ ml: 6 }}>
                        <Grid item xs={12} sm={3}>
                            <label htmlFor="avatar-upload">
                                <Avatar sx={{ width: 200, height: 200, mt: 4, cursor: 'pointer', 
                                border: '5px rgba(0, 116, 144, 1) solid' }} src={userData.avatar}></Avatar>
                            </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="avatar-upload"
                            style={{ display: 'none' }}
                            onChange={handleAvatarChange}
                            disabled={!isEditable} 
                        />
                            <Typography sx={{ mt: 1, ml: 6.5, color: '#414a4c' }}>Upload Photo</Typography>
                        </Grid>

                        <Grid item xs={12} sm={7.8}>
                            <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <label>First Name</label>
                                <TextField fullWidth variant="filled" value={userData.firstName} onChange={(e) => setUserData((prevData) => ({ ...prevData, firstName: e.target.value }))} InputProps={{ readOnly: !isEditable }} />
                        </Grid>

                        <Grid item xs={6}>
                            <label>Last Name</label>
                                <TextField fullWidth variant="filled" value={userData.lastName} onChange={(e) => setUserData((prevData) => ({ ...prevData, lastName: e.target.value }))} InputProps={{ readOnly: !isEditable }} />
                        </Grid>

                        <Grid item xs={12}>
                            <label>Email Address</label>
                            <TextField fullWidth variant="filled" value={userData.email} onChange={(e) => setUserData((prevData) => ({ ...prevData, email: e.target.value }))} InputProps={{ readOnly: !isEditable }} />
                        </Grid>

                        <Grid item xs={6}>
                            <label>Phone Number</label>
                            <TextField fullWidth variant="filled" value={userData.contactNumber} onChange={(e) => setUserData((prevData) => ({ ...prevData, contactNumber: e.target.value }))} InputProps={{ readOnly: !isEditable }} />
                        </Grid>

                        <Grid item xs={6}>
                            <label>Gender</label>
                            <Select fullWidth variant="filled" value={userData.gender} onChange={(e) => setUserData((prevData) => ({ ...prevData, gender: e.target.value }))} disabled={!isEditable}>
                                <MenuItem value={'Male'}>Male</MenuItem>
                                <MenuItem value={'Female'}>Female</MenuItem>
                                <MenuItem value={'Neutral'}>Neutral</MenuItem>
                                <MenuItem value={'Other'}>Other</MenuItem>
                            </Select>
                        </Grid>

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 3, width: 150, background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' } }}
                                    onClick={isEditable ? handleSaveChanges : handleEditClick}
                                >
                                    {isEditable ? 'Save Changes' : 'Edit Profile'}
                                </Button>
                            </Grid>
                        </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

                <Box component="main" sx={{ display: 'flex', flexDirection: 'column', mt: 3 }}>
                    <Typography variant="h4" sx={{ pl: 8, color: 'rgba(0, 116, 144, 1)', fontWeight: 'bold' }}>
                        Create Business Profile
                    </Typography>

                    <Box sx={{ background: '#F2F2F2', mr: 5, borderRadius: 2, ml: 8, mt: 3, pb: 3, pt: 3, pl: 6.5, pr: 6.5, display: 'flex', alignItems: 'center' }}>
                        <Avatar src="/images/business.png" sx={{ mr: 2, width: 100, height: 100, border: '3px rgba(0, 116, 144, 1) solid' }}>H</Avatar>
                        <Typography variant="h6" sx={{ flex: 1, color: '#414a4c', fontWeight: '500', marginRight: 2 }}>
                            Establishing a business profile lends credibility to your venture. Don’t wait, enhance your business’s trustworthiness by creating your profile today!
                        </Typography>

                        <Button variant="contained" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' }}} onClick={handleOpenBusinessProfile}>
                            Create
                        </Button>
                    </Box>
                </Box>

                <Box component="main" sx={{ display: 'flex', flexDirection: 'column', mt: 3 }}>
                    <Typography variant="h4" sx={{ pl: 8, color: 'rgba(0, 116, 144, 1)', fontWeight: 'bold' }}>
                        Business Profile Information
                        </Typography>

                    <Box sx={{ mr: 5, borderRadius: 2, ml: 8, mt: 3}}>
                    <TableContainer>
                    <Table>
                        <TableHead sx={{ backgroundColor: 'rgba(0, 116, 144, 0.1)'}}>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Type</Typography>
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Name</Typography>
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Information</Typography>
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Action</Typography>
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Action</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {businessProfiles.map((profile) => (
                                <TableRow key={`${profile.type}-${profile.id}`}>
                                    <TableCell sx={{ textAlign: 'center' }}>{profile.type}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{profile.companyName || profile.lastName}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{profile.industry || profile.emailAddress}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <Button variant="outlined" sx={{ color: 'rgba(0, 116, 144, 1)', borderColor: 'rgba(0, 116, 144, 1)' }} onClick={handleOpenInvestor}>
                                            View
                                        </Button>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <Button variant="outlined" sx={{ color: 'rgba(0, 116, 144, 1)', borderColor: 'rgba(0, 116, 144, 1)' }}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                    </TableContainer>
                </Box>
                </Box>
            </Box>

            {selectedBusinessProfile && (
                <Dialog open={Boolean(selectedBusinessProfile)} onClose={() => setSelectedBusinessProfile(null)}>
                    <DialogTitle>{selectedBusinessProfile.type}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Name: {selectedBusinessProfile.companyName || selectedBusinessProfile.lastName}</DialogContentText>
                        <DialogContentText>Information: {selectedBusinessProfile.industry || selectedBusinessProfile.emailAddress}</DialogContentText>
                        <DialogContentText>Description: {selectedBusinessProfile.companyDescription || selectedBusinessProfile.biography}</DialogContentText>
                        {/* Add more fields as needed */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSelectedBusinessProfile(null)}>Close</Button>
                    </DialogActions>
                </Dialog>
            )}

                
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
                            <Button variant="text" sx={{ mr: 2 , color: 'rgba(0, 116, 144, 1)'}} onClick={handleCloseBusinessProfile}>
                                Cancel
                            </Button>

                            {/* <Button variant="contained" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' }}}>
                                Create Profile
                        </Button>*/}
                        </Box>
                    </DialogActions>
                    </Box>
                </Box>
            )}

            {/* Custom Full Page Dialog for Creating Business Profile */}
            {openViewStartup && (
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

                        <ViewStartupProfile />

                    <DialogActions>
                        <Box sx={{ display: 'flex', mt: 1, mb: 1,mr: 5}}>
                            <Button variant="text" sx={{ mr: 2 , color: 'rgba(0, 116, 144, 1)'}} onClick={handleCloseStartUp}>
                                Cancel
                            </Button>

                            {/* <Button variant="contained" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' }}}>
                                Create Profile
                        </Button>*/}
                        </Box>
                    </DialogActions>
                    </Box>
                </Box>
            )}

            {/* Custom Full Page Dialog for Creating Business Profile */}
             {openViewInvestor && (
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

                        <ViewInvestorProfile />

                    <DialogActions>
                        <Box sx={{ display: 'flex', mt: 1, mb: 1,mr: 5}}>
                            <Button variant="text" sx={{ mr: 2 , color: 'rgba(0, 116, 144, 1)'}} onClick={handleCloseInvestor}>
                                Cancel
                            </Button>

                            {/* <Button variant="contained" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' }}}>
                                Create Profile
                        </Button>*/}
                        </Box>
                    </DialogActions>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default Profile;