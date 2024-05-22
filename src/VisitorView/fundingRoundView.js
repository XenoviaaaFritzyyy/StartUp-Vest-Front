import React, { useState } from 'react';
import { Avatar, Box, Divider, Toolbar, Typography, Grid, Button } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const drawerWidth = 240;

function FoundingRoundView() {
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
          <Typography variant="h4" gutterBottom>Seed A - Facebook</Typography>
          <StarsIcon sx={{ cursor: 'pointer', ml: 1, mt: -1, color: isFollowed ? 'rgba(0, 116, 144, 1)' : 'inherit' }} onClick={handleFollowToggle} />
        </Box>

        <Divider sx={{ mt: 2 }} />

        <Box component="main" sx={{ display: 'flex', flexGrow: 1, p: 4, width: '100%', overflowX: 'hidden' }}>
          <Grid container spacing={2}>
            {/* Left Box. Investor Information */}
            <Grid item xs={12} md={8}>
              <Box sx={{ background: 'white', display: 'flex', flexDirection: 'column', borderRadius: 2, p: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)', mb: 2 }}>Overview</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <Typography variant="h6"><strong>StartUp Name</strong></Typography>
                        <Typography variant="h6">Facebook</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography variant="h6"><strong>Announced Date</strong></Typography>
                        <Typography variant="h6">July 24, 2024</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography variant="h6"><strong>Closed on Date</strong></Typography>
                        <Typography variant="h6">August 28, 2024</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography variant="h6"><strong>Funding Type</strong></Typography>
                        <Typography variant="h6">Seed Round</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography variant="h6"><strong>Money Raised</strong></Typography>
                        <Typography variant="h6">---</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography variant="h6"><strong>Pre-Money Valuation</strong></Typography>
                        <Typography variant="h6">P1M</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Divider sx={{ mt: 5, mb: 3 }} />

                <Box sx={{ mb: 5 }}>
                  <Typography variant="h4" sx={{ pt: 2, pb: 2, fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)' }}>Investors</Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h6"><strong>Number of Investors</strong></Typography>
                          <Typography variant="h6">2</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6"><strong>Investor Names</strong></Typography>
                          <Typography variant="h6">1. Hazelyn Balingcasag</Typography>
                          <Typography variant="h6">2. Shelli Balingcasag</Typography>
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

export default FoundingRoundView;
