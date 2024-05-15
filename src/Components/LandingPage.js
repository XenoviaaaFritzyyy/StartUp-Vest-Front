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
          <Button variant="outlined" color="primary" sx={{ mr: 2 }}>
            Login
          </Button>
          <Button 
            variant="contained" 
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
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#008A90', textAlign: 'left', fontSize: '4rem' }}>
                <span style={{ display: 'block' }}>STARTUP</span>
                <span style={{ display: 'block' }}>VEST</span>
            </Typography>
            <Typography variant="body1" align="left" paragraph sx={{ fontWeight: 'bold', color: '#000000' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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