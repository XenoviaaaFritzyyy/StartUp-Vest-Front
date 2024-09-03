import React, { useState } from 'react';
import {
  Avatar, Box, Divider, List, ListItem, ListItemIcon, ListItemText,
  Toolbar, Typography, Grid, Button, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow
} from '@mui/material';

import PaidIcon from '@mui/icons-material/Paid';
import StoreIcon from '@mui/icons-material/Store';
import StarsIcon from '@mui/icons-material/Stars';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const drawerWidth = 240;

function StartUpView() {
  const [selectedPage, setSelectedPage] = useState('summary');
  const [isFollowed, setIsFollowed] = useState(false);

  const location = useLocation();
  const { startup } = location.state || {}; 

  if (!startup) {
    return <div>No startup data available</div>;
  }

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
          <Avatar
            variant="rounded"
            sx={{
              width: 150,
              height: 150,
              border: '5px solid rgba(0, 116, 144, 1)',
              borderRadius: 3,
              ml: 8
            }}
          />
        </Box>
        <Typography variant="h4" gutterBottom>
          {startup.companyName}
        </Typography>
        <StarsIcon
          sx={{
            cursor: 'pointer',
            ml: 1,
            mt: -1,
            color: isFollowed ? 'rgba(0, 116, 144, 1)' : 'inherit'
          }}
          onClick={handleFollowToggle}
        />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ mt: -3.5 }}>
        <List sx={{ display: 'flex', flexDirection: 'row', mr: 5 }}>
          <ListItem
            button
            selected={selectedPage === 'summary'}
            onClick={() => handlePageChange('summary')}
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

          <ListItem
            button
            selected={selectedPage === 'financial'}
            onClick={() => handlePageChange('financial')}
            sx={{
              '&.Mui-selected': { backgroundColor: '#C3DDD6' },
              '&:hover': { backgroundColor: '#C3DDD6 !important' },
              borderRadius: 1
            }}>
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText primary="Financial" />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ mb: 4 }} />
      <Box ml={4} flexGrow={1}>
        {selectedPage === 'summary' && (
          <Box
            component="main"
            sx={{ display: 'flex', flexGrow: 1, width: '100%', overflowX: 'hidden' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Box
                  sx={{
                    background: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    pl: 5,
                  }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)', mb: 1 }}>
                    Overview
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sx={{ textAlign: 'justify' }}>
                          <Typography>
                            <strong>Description</strong>
                          </Typography>
                          <Typography variant="body1">{startup.companyDescription}</Typography>
                        </Grid>

                        <Grid item xs={4}>
                          <Typography>
                            <strong>Founded Date</strong>
                          </Typography>
                          <Typography variant="body1">{startup.foundedDate}</Typography>
                        </Grid>

                        <Grid item xs={4}>
                          <Typography>
                            <strong>Company Type</strong>
                          </Typography>
                          <Typography variant="body1">{startup.typeOfCompany}</Typography>
                        </Grid>

                        <Grid item xs={4}>
                          <Typography>
                            <strong>No. of Employees</strong>
                          </Typography>
                          <Typography variant="body1">{startup.numberOfEmployees}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography>
                            <strong>Location</strong>
                          </Typography>
                          <Typography variant="body1">
                            {startup.streetAddress}, {startup.city}, {startup.state}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              {/* Right Box with Dynamic Links */}
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ p: 4, borderRadius: 2, mr: 5 }}>
                    <Stack spacing={2}>
                      {startup.website && (
                        <Button
                          variant="outlined"
                          fullWidth
                          href={startup.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<LanguageIcon />}
                          sx={{
                            backgroundColor: 'rgba(0, 116, 144, 1)',
                            color: 'white',
                            '&:hover': { backgroundColor: '#005f73' }
                          }}>
                          Website
                        </Button>
                      )}
                      {startup.linkedIn && (
                        <Button
                          variant="contained"
                          fullWidth
                          href={startup.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<LinkedInIcon />}
                          sx={{
                            backgroundColor: '#0A66C2',
                            color: 'white',
                            '&:hover': { backgroundColor: '#004182' }
                          }}>
                          LinkedIn
                        </Button>
                      )}
                      {startup.facebook && (
                        <Button
                          variant="contained"
                          fullWidth
                          href={startup.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<FacebookIcon />}
                          sx={{
                            backgroundColor: '#1877F2',
                            color: 'white',
                            '&:hover': { backgroundColor: '#0a52cc' }
                          }}>
                          Facebook
                        </Button>
                      )}
                      {startup.twitter && (
                        <Button
                          variant="contained"
                          fullWidth
                          href={startup.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<TwitterIcon />}
                          sx={{
                            backgroundColor: '#1DA1F2',
                            color: 'white',
                            '&:hover': { backgroundColor: '#0a8ddb' }
                          }}>
                          Twitter
                        </Button>
                      )}
                      {startup.instagram && (
                        <Button
                          variant="contained"
                          fullWidth
                          href={startup.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<InstagramIcon />}
                          sx={{
                            backgroundColor: '#E1306C',
                            color: 'white',
                            '&:hover': { backgroundColor: '#b02e5a' }
                          }}>
                          Instagram
                        </Button>
                      )}
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}

        {selectedPage === 'financial' && (
          <Box
            component="main"
            sx={{ display: 'flex', flexGrow: 1, width: '100%', overflowX: 'hidden' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TableContainer sx={{ borderRadius: 2, p: 2 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="financial table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Year</TableCell>
                        <TableCell align="center">Revenue</TableCell>
                        <TableCell align="center">Net Profit</TableCell>
                        <TableCell align="center">Funding</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {startup.financialData && startup.financialData.map((row) => (
                        <TableRow key={row.year}>
                          <TableCell component="th" scope="row">
                            {row.year}
                          </TableCell>
                          <TableCell align="right">{row.revenue}</TableCell>
                          <TableCell align="right">{row.netProfit}</TableCell>
                          <TableCell align="right">{row.funding}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default StartUpView;
