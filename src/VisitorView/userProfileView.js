import React, { useState } from 'react';
import { Avatar, Box, Divider, List, ListItem, ListItemIcon, Toolbar, Typography, ListItemText, Grid } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import StarsIcon from '@mui/icons-material/Stars';
import Navbar from '../Navbar/Navbar';

const drawerWidth = 240;

function UserView() {
  const [isFollowed, setIsFollowed] = useState(false); 

  const handleFollowToggle = () => {
    setIsFollowed(!isFollowed);
  };

  return (
    <Box sx={{ width: '100%', paddingLeft: `${drawerWidth}px`, mt: 5 }}>
      <Navbar />
      <Toolbar />

      <Box display="flex" alignItems="center">
        <Box mr={4}>
          <Avatar variant="rounded" sx={{ width: 180, height: 180, border: '5px solid rgba(0, 116, 144, 1)', borderRadius: 3, ml: 18 }}></Avatar>
        </Box>

        <Typography variant="h4" gutterBottom>Hazelyn Balingcasag</Typography>
        <StarsIcon sx={{ cursor: 'pointer', ml: 1, mt: -1, color: isFollowed ? 'green' : 'inherit' }} onClick={handleFollowToggle} />
      </Box>
      
      <Divider sx={{ mt: 5 }} />

      <Box ml={4} flexGrow={1} sx={{ bgcolor: '#EEEEEE', m: '50px 80px', borderRadius: 2}}>
        <Box sx={{ m: 5 }}>
          <Box sx={{ ml: 5, mr: 5 }}>
            <Typography variant="h4" sx={{ pt: 4, pb: 2, fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)' }}>Overview</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography variant="h6"><strong>Location</strong></Typography>
                    <Typography variant="h6">811 Ucma Village Apas Cebu City</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="h6"><strong>Gender</strong></Typography>
                    <Typography variant="h6">Female</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="h6"><strong>Email Address</strong></Typography>
                    <Typography variant="h6">hazleynbalingcasag123@gmail.com</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="h6"><strong>Contact Number</strong></Typography>
                    <Typography variant="h6">09362677352</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ mt: 5 }} />

          <Box sx={{ ml: 5, pb: 5, pr: 5 }}>
            <Typography variant="h4" sx={{ pt: 4, pb: 2, fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)' }}>Links</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Typography variant="h6"><strong>Website</strong></Typography>
                    <Typography variant="h6">https://www.facebook.com/</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="h6"><strong>Facebook</strong></Typography>
                    <Typography variant="h6">Hazelyn Balingcasag</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="h6"><strong>Twitter</strong></Typography>
                    <Typography variant="h6">Hazelyn Balingcasag</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="h6"><strong>Instagram</strong></Typography>
                    <Typography variant="h6">Hazelyn Balingcasag</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="h6"><strong>LinkedIn</strong></Typography>
                    <Typography variant="h6">Hazelyn Balingcasag</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UserView;
