import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, AppBar, List, Typography, CssBaseline, Toolbar, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import TableChartIcon from '@mui/icons-material/TableChartRounded';
import StoreIcon from '@mui/icons-material/Store';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOnRounded';
import PeopleIcon from '@mui/icons-material/PeopleRounded';
import MarkUnreadChatAltRoundedIcon from '@mui/icons-material/MarkUnreadChatAltRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';

const drawerWidth = 240;

export default function Navbar() {
  const menuItems = [
    { text: 'Dashboard', icon: <SpaceDashboardIcon sx={{color: '#F2F2F2'}}/>, path: '/dashboard' },
    { text: 'Cap Table', icon: <TableChartIcon sx={{color: '#F2F2F2'}}/>, path: '/captable' },
    { text: 'Companies', icon: <StoreIcon sx={{color: '#F2F2F2'}}/>, path: '/companies' },
    { text: 'Funding Round', icon: <MonetizationOnIcon sx={{color: '#F2F2F2'}}/>, path: '/fundinground' },
    { text: 'People', icon: <PeopleIcon sx={{color: '#F2F2F2'}}/>, path: '/people' },
    { text: 'Chat', icon: <MarkUnreadChatAltRoundedIcon sx={{color: '#F2F2F2'}}/>, path: '/chat' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'rgba(0, 116, 144, 1)' }}>
        <Toolbar>
            <Avatar sx={{ ml: -3, width: 70, height: 70}} src='images/logoonly.png'></Avatar>
            <Typography variant="h6" noWrap component="div" sx={{ml: -1}}>
              STARTUP VEST
            </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar sx={{ marginRight: 2, width: 32, height: 32}}>H</Avatar>
          <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h7" noWrap component="div" sx={{marginRight: 2}}>
            Hazelyn Balingcasag
          </Typography>
          </Link>
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
                <Avatar sx={{ marginTop: 1, marginRight: 2, marginBottom: 1, width: 32, height: 32}}>H</Avatar>
                <Typography noWrap component="div" sx={{fontSize: 15}}>
                  Hazelyn Balingcasag
                </Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{marginTop: 1}}>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemText primary={item.text} />
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{marginTop: 20.7}} />
            <ListItem disablePadding>
              <ListItemButton>
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
