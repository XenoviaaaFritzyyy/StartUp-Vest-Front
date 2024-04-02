import React, { useState } from 'react';
import { Avatar, Box, Divider, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';

import Navbar from '../Navbar/Navbar';

const drawerWidth = 240;

function UserView() {
  const [selectedPage, setSelectedPage] = useState('summary');

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  return (
    <Box sx={{ width: '100%', paddingLeft: `${drawerWidth}px`, mt: 5 }}>
      <Navbar />
      <Toolbar />

      <Box display="flex" alignItems="center">
        <Box mr={4}>
          <Avatar variant="rounded" sx={{ width: 180, height: 180, border: '5px solid #009688', borderRadius: 3, ml: 5 }}></Avatar>
        </Box>
        <Typography variant="h4" gutterBottom>Hazelyn Balingcasag</Typography>

      </Box>

      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <List sx={{ display: 'flex', flexDirection: 'row', mr: 5 }}>
          <ListItem button selected={selectedPage === 'summary'}  onClick={() => handlePageChange('summary')}
            sx={{ 
              '&.Mui-selected': { backgroundColor: '#C3DDD6' },
              '&:hover': { backgroundColor: '#C3DDD6 !important' },
              mr: 1,
              borderRadius: 1
            }}>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Summary" />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ mb: 5 }} />
      {/* Render content based on selected page */}
      <Box ml={4} flexGrow={1}>
        {selectedPage === 'summary' && (
          <Box>
            <Typography variant="h6">Summary</Typography>
            <Typography>
              Summary content goes here...
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default UserView;
