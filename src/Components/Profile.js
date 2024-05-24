import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import CreateBusinessProfileDialog from '../Dialogs/CreateBusinessProfileDialog';
import ViewStartupProfileDialog from '../Dialogs/ViewStartupProfileDialog';
import ViewInvestorProfileDialog from '../Dialogs/ViewInvestorProfileDialog';
import ConfirmDeleteDialog from '../Dialogs/ConfirmDeleteDialog';

import { Box, Typography, Toolbar, TextField, Avatar, Button, Select, MenuItem, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

const drawerWidth = 240;

function Profile() {
  const [isEditable, setIsEditable] = useState(false);
  const [openCreateBusinessProfile, setCreateBusinessProfile] = useState(false);
  const [businessProfiles, setBusinessProfiles] = useState([]);
  const [selectedBusinessProfile, setSelectedBusinessProfile] = useState(null);
  const [openViewStartup, setOpenViewStartup] = useState(false);
  const [openViewInvestor, setOpenViewInvestor] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        gender: '',
        avatar: '',
    });

    // New state for the profile picture URL
    const [profilePicUrl, setProfilePicUrl] = useState('');

    // Fetch user data when the component mounts.
    useEffect(() => {
        fetchUserData();
        fetchBusinessProfiles();
    // Call fetchProfilePicture here using the user ID from userData
        if (userData.id) {
            fetchProfilePicture(userData.id);
        }
    }, [userData.id]);

    // useEffect(() => {
    //     // Revoke the old blob URL when the component unmounts or before setting a new one
    //     return () => {
    //       if (userData.avatar) {
    //         URL.revokeObjectURL(userData.avatar);
    //       }
    //     };
    //   }, [userData.avatar]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/profile', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
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

            // const startups = responseStartups.data.map(profile => ({ ...profile, type: 'Startup' }));
            // const investors = responseInvestors.data.map(profile => ({ ...profile, type: 'Investor' }));

            const startups = responseStartups.data.filter(profile => !profile.isDeleted).map(profile => ({ ...profile, type: 'Startup' }));
            const investors = responseInvestors.data.filter(profile => !profile.isDeleted).map(profile => ({ ...profile, type: 'Investor' }));
    
            setBusinessProfiles([...investors, ...startups]);
        } catch (error) {
            console.error('Failed to fetch business profiles:', error);
        }
    };
    
    const handleEditClick = () => {
        setIsEditable(!isEditable);
    };

    // const handleAvatarChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => { setUserData((prevData) => ({...prevData, avatar: reader.result, }));
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    // console.log(userData.id)

    // Function to handle file upload
    const handleAvatarUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
    
        try {
        // const userId = /* logic to get the user's ID */;
        await axios.post(`http://localhost:3000/profile-picture/${userData.id}/upload`, formData, {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
            },
        });
        // After uploading, fetch the profile picture to update the avatar
        fetchProfilePicture(userData.id);
        } catch (error) {
        console.error('Error uploading profile picture:', error);
        }
    };

    // Function to fetch and display the profile picture
    const fetchProfilePicture = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/profile-picture/${userData.id}`, {
            responseType: 'blob',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const url = URL.createObjectURL(response.data);
            setProfilePicUrl(url); // Update the profile picture URL state
                } catch (error) {
                console.error('Error fetching profile picture:', error);
                }
    };

    // Function to handle profile picture update
    const updateProfilePicture = async (userId, file) => {
        const formData = new FormData();
        formData.append('file', file);
    
        try {
        const response = await axios.put(`http://localhost:3000/profile-picture/${userData.id}`, formData, {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
            },
        });
        // After updating, fetch the new profile picture to update the avatar
        fetchProfilePicture(userData.id);
        console.log(response.data); // Log the response from the server
        } catch (error) {
        console.error('Error updating profile picture:', error);
        }
    };
      

  const handleOpenBusinessProfile = () => {
    setCreateBusinessProfile(true);
  };

  const handleCloseBusinessProfile = () => {
    setCreateBusinessProfile(false);
    fetchBusinessProfiles();
  };

  const handleOpenStartUp = (profile) => {
    setSelectedBusinessProfile(profile);
    setOpenViewStartup(true);
  };

  const handleCloseStartUp = () => {
    setOpenViewStartup(false);
  };

  const handleOpenInvestor = (profile) => {
    setSelectedBusinessProfile(profile);
    setOpenViewInvestor(true);
  };

  const handleCloseInvestor = () => {
    setOpenViewInvestor(false);
  };

  const handleSaveChanges = async () => {
    try {
      await updateUser(userData);
      setIsEditable(false);
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  const handleOpenDeleteDialog = (profile) => {
    setProfileToDelete(profile);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  
  const updateUser = async (userData) => {
    try {
      const response = await axios.put(`http://localhost:3000/users/${userData.id}`, userData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('User data updated successfully:', response.data);
      setUserData(userData); // Update local state with new user data
    } catch (error) {
      console.error('Failed to update user data:', error);
      throw error;
    }
  };  

    const handleSoftDelete = async () => {
        if (!profileToDelete) {
            console.error('No profile selected');
            return;
        }
    
        try {
            // Determine the endpoint based on the type of the profile
            const endpoint = `http://localhost:3000/startups/${profileToDelete.id}/delete`;
    
            await axios.put(endpoint, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
    
            // Refresh the page or fetch the data again to reflect the changes
            fetchBusinessProfiles();
        } catch (error) {
            console.error('Failed to delete profile:', error);
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
                            <Avatar
                            sx={{ width: 200, height: 200, mt: 4, cursor: 'pointer', border: '5px rgba(0, 116, 144, 1) solid' }}
                            src={profilePicUrl}
                            // Add a key prop to force re-render when the avatar changes
                            />
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="avatar-upload"
                                style={{ display: 'none' }}
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    if (file && userData.id) {
                                    updateProfilePicture(userData.id, file);
                                    }
                                }}
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
                    <Button variant="contained"
                      sx={{ mt: 3, width: 150, background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' } }}
                      onClick={isEditable ? handleSaveChanges : handleEditClick}>
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
            <Typography variant="h6" sx={{ flex: 1, color: '#414a4c', fontWeight: '500'}}>
              Establishing a business profile lends credibility to your venture. Don’t wait, enhance your business’s trustworthiness by creating your profile today!
            </Typography>

            <Button variant="contained" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' } }} onClick={handleOpenBusinessProfile}>
              Create
            </Button>
          </Box>
        </Box>

        <Box component="main" sx={{ display: 'flex', flexDirection: 'column', mt: 3 }}>
          <Typography variant="h4" sx={{ pl: 8, color: 'rgba(0, 116, 144, 1)', fontWeight: 'bold' }}>
            Business Profile Information
          </Typography>

          <Box sx={{ mr: 5, borderRadius: 2, ml: 8, mt: 3 }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: 'rgba(0, 116, 144, 0.1)' }}>
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Type</Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Company Name</Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Industry</Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Action</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {businessProfiles
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((profile) => (
                      <TableRow key={`${profile.type}-${profile.id}`}>
                        <TableCell sx={{ textAlign: 'center' }}>{profile.type}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{profile.companyName || '-----' }</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{profile.industry || '-----' }</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                            {profile.type === 'Investor' ? (
                                <Button variant="contained" sx={{ width: 'calc(60% - 35px)', background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' } }} onClick={() => handleOpenInvestor(profile)}>
                                View
                                </Button>
                            ) : (
                                <>
                                <Button variant="contained" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' } }} onClick={() => handleOpenStartUp(profile)}>
                                    View
                                </Button>
                                <Button variant="outlined" sx={{ marginLeft: '20px', color: 'rgba(0, 116, 144, 1)', borderColor: 'rgba(0, 116, 144, 1)' }} onClick={() => handleOpenDeleteDialog(profile)}>
                                    Delete
                                </Button>
                                </>
                            )}
                            </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination rowsPerPageOptions={[3]}
              component="div"
              count={businessProfiles.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage} />

            <CreateBusinessProfileDialog open={openCreateBusinessProfile} onClose={handleCloseBusinessProfile} />
            <ViewStartupProfileDialog open={openViewStartup} profile={selectedBusinessProfile} onClose={handleCloseStartUp} />
            <ViewInvestorProfileDialog open={openViewInvestor} profile={selectedBusinessProfile} onClose={handleCloseInvestor} />

            <ConfirmDeleteDialog
              open={openDeleteDialog}
              onClose={handleCloseDeleteDialog}
              onConfirm={handleSoftDelete}
              companyName={profileToDelete ? profileToDelete.companyName : null}/>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Profile;