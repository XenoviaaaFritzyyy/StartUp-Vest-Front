import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button, Grid } from '@mui/material';

const LandingPage = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1024); 
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ position: 'relative', mt: 5 }}>
      <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 5,
        }}>
        <Box component="img"
          src="/images/logoStartUp.png"
          alt="Startup Vest Logo"
          sx={{ width: '25%', height: 'auto', ml: 3 }}
        />

        <Box>
          <Button component={Link} to="/login" variant="text" color="primary" sx={{ mr: 2, color: '#007490' }}>
            Login
          </Button>

          <Button component={Link}
            to="/signup"
            variant="contained"
            sx={{
              backgroundImage: 'linear-gradient(45deg, #F1CC0A, #EDA61C)',
              color: '#FFFFFF'
            }}>
            Signup
          </Button>
        </Box>
      </Box>

      {isLargeScreen && (
        <>
          {/* Top Right Border Design */}
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '50%',
              height: '15px',
              backgroundColor: 'rgba(0, 116, 144, 1)',
              borderRadius: '0 0 0 10px',
              zIndex: 10,
            }}/>

          <Box sx={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '25px',
              height: '50%',
              backgroundColor: 'rgba(0, 116, 144, 1)',
              borderRadius: '0 0 0 10px',
              zIndex: 10,
            }}/>

          {/* Bottom Left Border Design */}
          <Box sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '50%',
              height: '15px',
              backgroundColor: 'rgba(0, 116, 144, 1)',
              borderRadius: '0 10px 0 0',
              zIndex: 10,
            }}/>

          <Box sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '25px',
              height: '50%',
              backgroundColor: 'rgba(0, 116, 144, 1)',
              borderRadius: '0 10px 0 0',
              zIndex: 10,
            }}/>
        </>
      )}

      <Grid container spacing={4} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              textAlign: { xs: 'center', md: 'left' },
            }}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)', ml: 3 }}>
              Empower Your Startup Journey
            </Typography>
            <Typography variant="h6" align="justify" paragraph sx={{ml: 3, mr: 3, color: '#5d5555' }}>
              Unlock the tools to manage growth, connect with investors, and secure funding. Experience real-time analytics, seamless investment tracking, and unparalleled networking opportunities. Your ultimate platform for startup success.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Box component="img" src="/images/startup_illustration.png" alt="Startup Illustration" sx={{ width: '110%', maxWidth: '800px' }} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
