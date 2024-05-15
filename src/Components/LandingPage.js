import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button, Grid} from '@mui/material';

const LandingPage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 5,
        }}
      >
        <Box>
          <Box
            component="img"
            src="/images/logoStartUp.png"
            alt="Startup Vest Logo"
            sx={{ height: 64 }}
          />
        </Box>
        <Box>
          <Button component={Link} to="/login" variant="outlined" color="primary" sx={{ mr: 2 }}>
            Login
          </Button>
          <Button 
            component={Link} to="/signup" variant="contained" 
            sx={{
              backgroundImage: 'linear-gradient(45deg, #F1CC0A, #EDA61C)',
              color: '#FFFFFF'
            }}
          >
            Signup
          </Button>
        </Box>
      </Box>
      
      <Grid container spacing={4} sx={{ mt: 5 }}>
        <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#008A90', textAlign: 'left', fontSize: '2.6rem' }}>
                STARTUP VEST
            </Typography>
            <Typography variant="body1" align="left" paragraph sx={{ fontWeight: 'bold', color: '#000000', fontSize: '3.5rem' }}>
                EMPOWERING STARTUPS, TRACKING INVESTMENTS
            </Typography>
            </Box>
        </Grid>
        <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
            <Box
                component="img"
                src="/images/startup_illustration.png"
                alt="Startup Illustration"
                sx={{ width: '132%', height: 'auto', maxWidth: '120%', maxHeight: 700 }}
            />
            </Box>
        </Grid>
        </Grid>
    </Container>
  );
};

export default LandingPage;
