import React, { useState } from 'react';
import { Avatar, Box, Divider, Toolbar, Typography, Grid, Button } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const drawerWidth = 240;

function UserProfileView() {
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowed(!isFollowed);
  };

  return (
    <>
      <Navbar />
      <Toolbar />

      <Box sx={{ width: '100%', paddingLeft: `${drawerWidth}px`, mt: 5 }}>
        <Box display="flex" alignItems="center">
          <Box mr={4}>
            <Avatar variant="rounded" sx={{ width: 150, height: 150, border: '5px solid rgba(0, 116, 144, 1)', borderRadius: 3, ml: 8 }}></Avatar>
          </Box>
          <Typography variant="h4" gutterBottom>Hazelyn Balingcasag</Typography>
          <StarsIcon sx={{ cursor: 'pointer', ml: 1, mt: -1, color: isFollowed ? 'rgba(0, 116, 144, 1)' : 'inherit' }} onClick={handleFollowToggle} />
        </Box>

        <Divider sx={{ mt: 5 }} />

        <Box component="main" sx={{ display: 'flex', flexGrow: 1, p: 4, width: '100%', overflowX: 'hidden' }}>
          <Grid container spacing={2}>
            {/* Left Box. Investor Information */}
            <Grid item xs={12} md={8}>
              <Box sx={{ background: 'white', display: 'flex', flexDirection: 'column', borderRadius: 2, pb: 5, pl: 5, pr: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)', mb: 2 }}>Overview</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sx={{ textAlign: 'justify' }}>
                        <Typography variant="h6"><strong>Biography</strong></Typography>
                        <Typography variant="h6">
                          Shelli Morgan, a trailblazing entrepreneur and compassionate humanitarian, emerged from the vibrant streets of NYC. Graduating from Columbia University, she swiftly founded a groundbreaking startup at 25, pioneering sustainable urban innovation.
                        </Typography>
                      </Grid>

                      <Grid item xs={8}>
                        <Typography variant="h6"><strong>Email Address</strong></Typography>
                        <Typography variant="h6">hazleynbalingcasag123@gmail.com</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography variant="h6"><strong>Contact Number</strong></Typography>
                        <Typography variant="h6">09362677352</Typography>
                      </Grid>

                      <Grid item xs={8}>
                        <Typography variant="h6"><strong>Location</strong></Typography>
                        <Typography variant="h6">811 Ucma Village Apas Cebu City</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography variant="h6"><strong>Country</strong></Typography>
                        <Typography variant="h6">Philippines</Typography>
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
                          <Typography variant="h6">Discover More on My Official Website at <strong>https://www.facebook.com/</strong></Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6"><strong>LinkedIn</strong></Typography>
                          <Typography variant="h6">Hazelyn Balingcasag</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6"><strong>Facebook</strong></Typography>
                          <Typography variant="h6">Hazelyn Balingcasag</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6"><strong>Twitter</strong></Typography>
                          <Typography variant="h6">Hazelyn Balingcasag</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6"><strong>Instagram</strong></Typography>
                          <Typography variant="h6">Hazelyn Balingcasag</Typography>
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
