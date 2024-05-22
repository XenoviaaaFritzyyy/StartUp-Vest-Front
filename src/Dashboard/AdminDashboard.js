import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Toolbar } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

const drawerWidth = 240; // Define the drawer width constant

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [numStartups, setNumStartups] = useState(0);
  const [numInvestors, setNumInvestors] = useState(0);
  const [latestUser, setLatestUser] = useState({ username: 'N/A', businessProfile: 'N/A' });

  useEffect(() => {
    // Example API calls - replace with your actual API endpoints
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('/api/users/count');
        const startupsResponse = await axios.get('/api/startups/count');
        const investorsResponse = await axios.get('/api/investors/count');
        const latestUserResponse = await axios.get('/api/users/latest');

        setTotalUsers(usersResponse.data.count);
        setNumStartups(startupsResponse.data.count);
        setNumInvestors(investorsResponse.data.count);
        setLatestUser(latestUserResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ marginLeft: `${drawerWidth}px` }}> {/* Apply the drawerWidth constant */}
      <Navbar />
      <Toolbar/>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">User Growth Graph</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{totalUsers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">No. of Startups</Typography>
            <Typography variant="h4">{numStartups}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">No. of Investors</Typography>
            <Typography variant="h4">{numInvestors}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Table for user information</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Latest User</Typography>
            <Typography variant="subtitle1">username: {latestUser.username}</Typography>
            <Typography variant="subtitle1">business profile: {latestUser.businessProfile}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Count of Industry</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
