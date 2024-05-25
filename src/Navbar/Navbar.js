import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Drawer, AppBar, List, Typography, CssBaseline, Toolbar, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import StoreIcon from '@mui/icons-material/Store';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOnRounded';
import PeopleIcon from '@mui/icons-material/PeopleRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';

const drawerWidth = 240;

export default function Navbar() {
  const menuItems = [
    { text: 'Dashboard', icon: <SpaceDashboardIcon sx={{color: '#F2F2F2'}}/>, path: '/userdashboard'},
    { text: 'Companies', icon: <StoreIcon sx={{color: '#F2F2F2'}}/>, path: '/companies'},
    { text: 'Funding Round', icon: <MonetizationOnIcon sx={{color: '#F2F2F2'}}/>, path: '/fundinground'},
    { text: 'People', icon: <PeopleIcon sx={{color: '#F2F2F2'}}/>, path: '/people'},
  ];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');

  // Fetch user data when the component mounts.
  useEffect(() => {
      fetchUserData();
  }, []);

  const fetchUserData = async () => {
      try {
          const response = await axios.get('http://localhost:3000/users/profile', {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
          });

          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);

          const profilePicResponse = await axios.get(`http://localhost:3000/profile-picture/${response.data.id}`, {
            responseType: 'blob',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });

          const profilePicUrl = URL.createObjectURL(profilePicResponse.data);
          setUserPhoto(profilePicUrl); 
      } catch (error) {
          console.error('Failed to fetch user data:', error);
      }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location = '/';
};

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'rgba(0, 116, 144, 1)' }}>
        <Toolbar>
        <Avatar sx={{ ml: -3, width: 70, height: 70}} src='images/logoonly.png'></Avatar>
          <Typography variant="h6" noWrap component="div" sx={{ml: -1}}>
            StartUp Vest
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar sx={{ mr: 1, width: 40, height: 40, border: '2px #F2F2F2 solid' }}>
            {userPhoto ? (
              <img
                src={userPhoto}
                alt="User"
                style={{
                  width: '100%', 
                  height: '100%',
                  objectFit: 'cover', 
                  objectPosition: 'center'
                }}
              />
            ) : (
              `${firstName[0]}${lastName[0]}`
            )}
          </Avatar>
            <Typography variant="h6" noWrap component="div" sx={{marginRight: 2}}>
              {lastName}, {firstName}
            </Typography>
            <IconButton size="medium" aria-label="show 17 new notifications" color="inherit" sx={{marginRight: 5}}>
              <NotificationsIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', background: 'rgba(0, 116, 144, 1)', color: '#F2F2F2' },
        }}>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem disablePadding>
            <ListItemButton component={Link} to="/profile">
            <Avatar sx={{ mr: 1, mt: 1, mb: 1, width: 40, height: 40, border: '2px #F2F2F2   solid' }}>
              {userPhoto ? (
                <img
                  src={userPhoto}
                  alt="User"
                  style={{
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    objectPosition: 'center',
                  }}/>
              ) : (
                `${firstName[0]}${lastName[0]}`
              )}
            </Avatar>
                <Typography variant="h6" noWrap component="div">
                  {firstName} {lastName}
                </Typography>
              </ListItemButton>
            </ListItem>

            <Divider />

            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{p: 1}}>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemText primary={item.text} />
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
            <ListItem disablePadding sx={{p: 1}}>
            <ListItemButton component={Link} to="/" onClick={handleLogout}>
                <ListItemText primary="Logout" />
                <ListItemIcon>
                  <LogoutIcon sx={{color: '#F2F2F2'}}/>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}