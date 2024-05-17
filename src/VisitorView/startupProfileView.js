import React, { useState } from 'react';
import { Avatar, Box, Divider, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import PaidIcon from '@mui/icons-material/Paid';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import StarsIcon from '@mui/icons-material/Stars';

import Navbar from '../Navbar/Navbar';

const drawerWidth = 240;

function StartUpView() {
  const [selectedPage, setSelectedPage] = useState('summary');
  const [isFollowed, setIsFollowed] = useState(false); 

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  const handleFollowToggle = () => {
    setIsFollowed(!isFollowed);
  };

  return (
    <Box sx={{ width: '100%', paddingLeft: `${drawerWidth}px`, mt: 5 }}>
      <Navbar />
      <Toolbar />

      <Box display="flex" alignItems="center">
        <Box mr={4}>
          <Avatar variant="rounded" sx={{ width: 180, height: 180, border: '5px solid rgba(0, 116, 144, 1)', borderRadius: 3, ml: 5 }}></Avatar>
        </Box>
        <Typography variant="h4" gutterBottom>Facebook</Typography>
        <StarsIcon sx={{ cursor: 'pointer', ml: 1, mt: -1, color: isFollowed ? 'rgba(0, 116, 144, 1)' : 'inherit' }} onClick={handleFollowToggle} />
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

          <ListItem button selected={selectedPage === 'financial'} onClick={() => handlePageChange('financial')}
            sx={{ 
              '&.Mui-selected': { backgroundColor: '#C3DDD6' },
              '&:hover': { backgroundColor: '#C3DDD6 !important' },
              mr: 1,
              borderRadius: 1
            }}>
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText primary="Financial" />
          </ListItem>
          
          <ListItem 
            button selected={selectedPage === 'news'} onClick={() => handlePageChange('news')}
            sx={{ 
              '&.Mui-selected': { backgroundColor: '#C3DDD6' },
              '&:hover': { backgroundColor: '#C3DDD6 !important' },
              borderRadius: 1
            }}>
            <ListItemIcon>
              <NewspaperIcon />
            </ListItemIcon>
            <ListItemText primary="News" />
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

        {selectedPage === 'financial' && (
          <Box>
            <Typography variant="h6">Financial</Typography>
            <Typography>
              Financial information goes here...
            </Typography>
          </Box>
        )}

        {selectedPage === 'news' && (
          <Box>
            <Typography variant="h6">News</Typography>
            <Typography>
              News content goes here...
            </Typography>
          </Box>
        )}

      </Box>
    </Box>
  );
}

export default StartUpView;
