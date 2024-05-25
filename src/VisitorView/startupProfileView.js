import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Divider, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import PaidIcon from '@mui/icons-material/Paid';
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
        <Avatar variant="rounded" sx={{ width: 150, height: 150, border: '5px solid rgba(0, 116, 144, 1)', borderRadius: 3, ml: 8 }}></Avatar>
        </Box>
        <Typography variant="h4" gutterBottom>Facebook</Typography>
        <StarsIcon sx={{ cursor: 'pointer', ml: 1, mt: -1, color: isFollowed ? 'rgba(0, 116, 144, 1)' : 'inherit' }} onClick={handleFollowToggle} />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ mt: -3.5  }}>
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
              borderRadius: 1
            }}>
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText primary="Financial" />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ mb: 5 }} />
      {/* Render content based on selected page */}
      <Box ml={4} flexGrow={1}>
        {selectedPage === 'summary' && (
      <Box component="main" sx={{ display: 'flex', flexGrow: 1, width: '100%', overflowX: 'hidden', mb: 3 }}>
      <Grid container spacing={2}>
        {/* Left Box. Investor Information */}
        <Grid item xs={12} md={8}>
          <Box sx={{ background: 'white', display: 'flex', flexDirection: 'column', borderRadius: 2, pb: 3, pl: 5, pr: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)', mb: 2 }}>Overview</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sx={{ textAlign: 'justify' }}>
                    <Typography variant="h6"><strong>Description</strong></Typography>
                    <Typography variant="body1">
                      Founded with a vision to drive technological advancements and deliver unparalleled quality, Shelli Corporation stands at the forefront of innovation in the global market. With a diverse portfolio spanning industries such as technology, manufacturing, and services, Shelli Corporation is dedicated to creating value and fostering sustainable growth for our clients and communities.
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="h6"><strong>Founded Date</strong></Typography>
                    <Typography variant="body1">
                      September 24, 2024
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="h6"><strong>Company Type</strong></Typography>
                    <Typography variant="body1">
                      Non-profit
                    </Typography>                  
                  </Grid>

                  
                  <Grid item xs={4}>
                    <Typography variant="h6"><strong>No. of Employees</strong></Typography>
                    <Typography variant="body1">
                      10-50
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="h6"><strong>Location</strong></Typography>
                    <Typography variant="body1">
                      811 Ucma Village Apas Cebu City
                    </Typography>                  
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Divider sx={{ mt: 5, mb: 3 }} />

            <Box>
              <Typography variant="h4" sx={{ pt: 2, pb: 2, fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)' }}>Links</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Typography variant="h6"><strong>Website</strong></Typography>
                      <Typography variant="body1">Discover More on My Official Website at <strong>https://www.crunchbase.com/person/denis-shafranik</strong></Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6"><strong>LinkedIn</strong></Typography>
                      <Typography variant="body1">Hazelyn Balingcasag</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6"><strong>Facebook</strong></Typography>
                      <Typography variant="body1">Hazelyn Balingcasag</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6"><strong>Twitter</strong></Typography>
                      <Typography variant="body1">Hazelyn Balingcasag</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6"><strong>Instagram</strong></Typography>
                      <Typography variant="body1">Hazelyn Balingcasag</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        {/* Right Box */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ p: 6, borderRadius: 2, background: '#F2F2F2', mr: 5}}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Discover Opportunities</Typography>
              <Typography variant='body1'>Explore new ventures and opportunities that match your interests.</Typography>
              <Button variant="outlined" fullWidth component={Link} to="/companies" sx={{mt: 3, color: 'rgba(0, 116, 144, 1)', borderColor: 'rgba(0, 116, 144, 1)', '&:hover': { color: 'rgba(0, 116, 144, 0.7)', borderColor: 'rgba(0, 116, 144, 0.7)'}}}>
                Check Companies
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
        )}

        {selectedPage === 'financial' && (
      <Box component="main" sx={{ display: 'flex', flexGrow: 1, width: '100%', overflowX: 'hidden', mb: 3 }}>
      <Grid container spacing={2}>
        {/* Left Box. Investor Information */}
        <Grid item xs={12} md={8}>
          <Box sx={{ background: 'white', display: 'flex', flexDirection: 'column', borderRadius: 2, pb: 3, pl: 5, pr: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)', mb: 2 }}>Funding Rounds</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3} align='center'>
                  <Grid item xs={6}>
                    <Typography variant="h6"><strong>No. of Funding Rounds</strong></Typography>
                    <Typography variant="body1">
                      5
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="h6"><strong>Total Funding Amount</strong></Typography>
                    <Typography variant="body1">
                      5
                    </Typography>                  
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ borderRadius: 2, mt: 3 }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: 'rgba(0, 116, 144, 0.1)' }}>
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Transaction Name</Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Funding Type</Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Money Raised</Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Announced Date</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center' }}>AAA</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>AAA</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>AAA</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>AAA</TableCell>
                      </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* <TablePagination rowsPerPageOptions={[3]}
              component="div"
              count={businessProfiles.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage} /> */}
          </Box>
        </Box>
      </Grid>

      
      {/* Right Box */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ p: 6, borderRadius: 2, background: '#F2F2F2', mr: 5}}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Discover Opportunities</Typography>
              <Typography variant='body1'>Explore new ventures and opportunities that match your interests.</Typography>
              <Button variant="outlined" fullWidth component={Link} to="/companies" sx={{mt: 3, color: 'rgba(0, 116, 144, 1)', borderColor: 'rgba(0, 116, 144, 1)', '&:hover': { color: 'rgba(0, 116, 144, 0.7)', borderColor: 'rgba(0, 116, 144, 0.7)'}}}>
                Check Companies
              </Button>
            </Box>
          </Box>
        </Grid>
      
      <Grid item xs={12} md={8}>
          <Box sx={{ background: 'white', display: 'flex', flexDirection: 'column', borderRadius: 2, pb: 3, pl: 5, pr: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)', mb: 2 }}>Cap Table</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3} align='center'>
                  <Grid item xs={6}>
                    <Typography variant="h6"><strong>Total Shares</strong></Typography>
                    <Typography variant="body1">
                      5
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="h6"><strong>Investors</strong></Typography>
                    <Typography variant="body1">
                      5
                    </Typography>                  
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ borderRadius: 2, mt: 3 }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: 'rgba(0, 116, 144, 0.1)' }}>
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Transaction Name</Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Title</Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Shares</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center' }}>AAA</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>AAA</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>AAA</TableCell>
                      </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* <TablePagination rowsPerPageOptions={[3]}
              component="div"
              count={businessProfiles.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage} /> */}
          </Box>
        </Box>
      </Grid>
      </Grid>
    </Box>
        )}
      </Box>
    </Box>
  );
}

export default StartUpView;
