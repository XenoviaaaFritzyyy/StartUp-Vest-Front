import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Box, Divider, Toolbar, Typography, Grid, Button, Stack } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useLocation } from 'react-router-dom';
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
      const responseInvestors = await axios.get('http://localhost:3000/investors', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const investors = responseInvestors.data.map(profile => ({ ...profile, type: 'Investor' }));
      setBusinessProfiles(investors);
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
            {/* Left Box: User Information */}
            <Grid item xs={12} md={8}>
              <Box sx={{ background: 'white', display: 'flex', flexDirection: 'column', borderRadius: 2, pb: 3, pl: 5, pr: 5 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)', mb: 2 }}>Overview</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography><strong>Biography</strong></Typography>
                        <Typography variant="body1">{profile.biography}</Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography><strong>Email Address</strong></Typography>
                        <Typography variant="body1">{profile.emailAddress}</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography><strong>Contact Number</strong></Typography>
                        <Typography variant="body1">{profile.contactInformation}</Typography>
                      </Grid>

                      <Grid item xs={2}>
                        <Typography><strong>Gender</strong></Typography>
                        <Typography variant="body1">{profile.gender}</Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography><strong>Location</strong></Typography>
                        <Typography variant="body1">{profile.streetAddress}, {profile.city}, {profile.country}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Right Box with Dynamic Links */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ p: 4, borderRadius: 2, mr: 5, backgroundColor: 'white' }}>
                  <Stack spacing={2}>
                    {profile.website && (
                      <Button
                        variant="outlined"
                        fullWidth
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<LanguageIcon />}
                        sx={{
                          backgroundColor: 'rgba(0, 116, 144, 1)',
                          color: 'white',
                          '&:hover': { backgroundColor: '#005f73' }
                        }}>
                        Website
                      </Button>
                    )}
                    {profile.linkedIn && (
                      <Button
                        variant="contained"
                        fullWidth
                        href={profile.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<LinkedInIcon />}
                        sx={{
                          backgroundColor: '#0A66C2',
                          color: 'white',
                          '&:hover': { backgroundColor: '#004182' }
                        }}>
                        LinkedIn
                      </Button>
                    )}
                    {profile.facebook && (
                      <Button
                        variant="contained"
                        fullWidth
                        href={profile.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<FacebookIcon />}
                        sx={{
                          backgroundColor: '#1877F2',
                          color: 'white',
                          '&:hover': { backgroundColor: '#0a52cc' }
                        }}>
                        Facebook
                      </Button>
                    )}
                    {profile.twitter && (
                      <Button
                        variant="contained"
                        fullWidth
                        href={profile.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<TwitterIcon />}
                        sx={{
                          backgroundColor: '#1DA1F2',
                          color: 'white',
                          '&:hover': { backgroundColor: '#0a8ddb' }
                        }}>
                        Twitter
                      </Button>
                    )}
                    {profile.instagram && (
                      <Button
                        variant="contained"
                        fullWidth
                        href={profile.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<InstagramIcon />}
                        sx={{
                          backgroundColor: '#E1306C',
                          color: 'white',
                          '&:hover': { backgroundColor: '#b02e5a' }
                        }}>
                        Instagram
                      </Button>
                    )}
                  </Stack>
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
