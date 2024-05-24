import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Box, Divider, Toolbar, Typography, Grid, Button } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const drawerWidth = 240;

function UserProfileView() {
  const [isFollowed, setIsFollowed] = useState(false);
  const [businessProfiles, setBusinessProfiles] = useState([]);
  const location = useLocation();
  const profile = location.state?.profile;

  const handleFollowToggle = () => {
    setIsFollowed(!isFollowed);
  };

  const fetchBusinessProfiles = async () => {
    try {
      const responseInvestors = await axios.get(`http://localhost:3000/investors`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const investors = responseInvestors.data.map(profile => ({ ...profile, type: 'Investor' }));

      setBusinessProfiles([...investors]);
    } catch (error) {
      console.error('Failed to fetch business profiles:', error);
    }
  };

  useEffect(() => {
    fetchBusinessProfiles();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Toolbar />

      <Box sx={{ width: '100%', paddingLeft: `${drawerWidth}px`, mt: 5 }}>
        <Box display="flex" alignItems="center">
          <Box mr={4}>
            <Avatar variant="rounded" sx={{ width: 150, height: 150, border: '5px solid rgba(0, 116, 144, 1)', borderRadius: 3, ml: 8 }}></Avatar>
          </Box>
          <Typography variant="h4" gutterBottom>{`${profile.firstName} ${profile.lastName}`}</Typography>
          <StarsIcon sx={{ cursor: 'pointer', ml: 1, mt: -1, color: isFollowed ? 'rgba(0, 116, 144, 1)' : 'inherit' }} onClick={handleFollowToggle} />
        </Box>

        <Divider sx={{ mt: 5 }} />

        <Box component="main" sx={{ display: 'flex', flexGrow: 1, p: 4, width: '100%', overflowX: 'hidden' }}>
          <Grid container spacing={2}>
            {/* Left Box. Investor Information */}
            <Grid item xs={12} md={8}>
              <Box sx={{ background: 'white', display: 'flex', flexDirection: 'column', borderRadius: 2, pb: 3, pl: 5, pr: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)', mb: 2 }}>Overview</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} align='justify'>
                        <Typography variant="h6"><strong>Biography</strong></Typography>
                        <Typography variant="body1">{profile.biography}</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography variant="h6"><strong>Email Address</strong></Typography>
                        <Typography variant="body1">{profile.emailAddress}</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography variant="h6"><strong>Contact Number</strong></Typography>
                        <Typography variant="body1">{profile.contactInformation}</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography variant="h6"><strong>Gender</strong></Typography>
                        <Typography variant="body1">{profile.gender}</Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="h6"><strong>Location</strong></Typography>
                        <Typography variant="body1">{profile.streetAddress}, {profile.city}, {profile.country}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Divider sx={{ mt: 5, mb: 3 }} />

                <Box>
                  <Typography variant="h4" sx={{ pt: 2, pb: 2, fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)' }}>Links</Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h6"><strong>Website</strong></Typography>
                          <Typography variant="body1">{profile.website || '---' }</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6"><strong>LinkedIn</strong></Typography>
                          <Typography variant="body1">{profile.linkedIn || '---' }</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6"><strong>Facebook</strong></Typography>
                          <Typography variant="body1">{profile.facebook || '---' }</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6"><strong>Twitter</strong></Typography>
                          <Typography variant="body1">{profile.twitter || '---' }</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6"><strong>Instagram</strong></Typography>
                          <Typography variant="body1">{profile.instagram || '---' }</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>

            {/* Right Box */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ p: 6, borderRadius: 2, background: '#F2F2F2'}}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Discover Opportunities</Typography>
                  <Typography variant="h6">Explore new ventures and opportunities that match your interests.</Typography>
                  <Button variant="outlined" fullWidth component={Link} to="/companies" sx={{mt: 3, color: 'rgba(0, 116, 144, 1)', borderColor: 'rgba(0, 116, 144, 1)', '&:hover': { color: 'rgba(0, 116, 144, 0.7)', borderColor: 'rgba(0, 116, 144, 0.7)'}}}>
                    Check Companies
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default UserProfileView;
