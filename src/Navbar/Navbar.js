import * as React from 'react';
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
    { text: 'Dashboard', icon: <SpaceDashboardIcon sx={{color: '#F2F2F2'}}/> },
    { text: 'Cap Table', icon: <TableChartIcon sx={{color: '#F2F2F2'}}/> },
    { text: 'Companies', icon: <StoreIcon sx={{color: '#F2F2F2'}}/> },
    { text: 'Funding Round', icon: <MonetizationOnIcon sx={{color: '#F2F2F2'}}/> },
    { text: 'People', icon: <PeopleIcon sx={{color: '#F2F2F2'}}/> },
    { text: 'Chat', icon: <MarkUnreadChatAltRoundedIcon sx={{color: '#F2F2F2'}}/> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'rgba(0, 116, 144, 1)' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            StartUp Vest
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar sx={{ marginRight: 2, width: 32, height: 32}}>H</Avatar>
            <Typography variant="h7" noWrap component="div" sx={{marginRight: 2}}>
              Hazelyn Balingcasag
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
              <ListItemButton>
                <Avatar sx={{ marginTop: 1, marginRight: 2, marginBottom: 1, width: 32, height: 32}}>H</Avatar>
                <Typography noWrap component="div" sx={{fontSize: 15}}>
                  Hazelyn Balingcasag
                </Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{marginTop: 1}}>
                <ListItemButton>
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
