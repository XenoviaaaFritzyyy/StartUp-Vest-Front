import React, { useState } from 'react';
import { Avatar, Box, Divider, Toolbar, Typography, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, DialogActions, FormControl, TablePagination } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const drawerWidth = 240;

function FoundingRoundView() {
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowed(!isFollowed);
  };

  return (
    <>
      <Navbar />
      <Toolbar />

      <Box sx={{ width: '100%', paddingLeft: `${drawerWidth}px`, mt: 5 }}>
        <Box display="flex" alignItems="center">
          <Box mr={4}>
          <Avatar variant="rounded" sx={{ width: 150, height: 150, border: '5px solid rgba(0, 116, 144, 1)', borderRadius: 3, ml: 8 }}></Avatar>
          </Box>
          <Typography variant="h4" gutterBottom>Seed A - Facebook</Typography>
          <StarsIcon sx={{ cursor: 'pointer', ml: 1, mt: -1, color: isFollowed ? 'rgba(0, 116, 144, 1)' : 'inherit' }} onClick={handleFollowToggle} />
        </Box>

        <Divider sx={{ mt: 5 }} />

        <Box component="main" sx={{ display: 'flex', flexGrow: 1, p: 4, width: '100%', overflowX: 'hidden' }}>
          <Grid container spacing={2}>
            {/* Left Box. Investor Information */}
            <Grid item xs={12} md={8}>
              <Box sx={{ background: 'white', display: 'flex', flexDirection: 'column', borderRadius: 2, pb: 3, pl: 5, pr: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)', mb: 2 }}>Overview</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <Typography variant="h6"><strong>StartUp Name</strong></Typography>
                        <Typography variant="body1">Facebook</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography variant="h6"><strong>Announced Date</strong></Typography>
                        <Typography variant="body1">July 24, 2024</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography variant="h6"><strong>Closed on Date</strong></Typography>
                        <Typography variant="body1">August 28, 2024</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography variant="h6"><strong>Funding Type</strong></Typography>
                        <Typography variant="body1">Seed Round</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography variant="h6"><strong>Money Raised</strong></Typography>
                        <Typography variant="body1">---</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography variant="h6"><strong>Pre-Money Valuation</strong></Typography>
                        <Typography variant="body1">P1M</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Divider sx={{ mt: 5, mb: 3 }} />

                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)', }}>Investors</Typography>
                <TableContainer component={Box} sx={{ mt: 2, backgroundColor: 'white'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Investor Name</TableCell>
                                <TableCell sx={{ textAlign: 'justify', fontWeight: 'bold' }}>Title</TableCell>
                                <TableCell sx={{ textAlign: 'justify', fontWeight: 'bold' }}>Share</TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {/* {businessProfiles
                                .filter(profile => filter === 'All' || profile.type === filter)
                                .slice(businessPage * businessRowsPerPage, businessPage * businessRowsPerPage + businessRowsPerPage)
                                .map((profile) => ( */}
                                <TableRow>
                                    <TableCell sx={{ textAlign: 'center' }}>AA</TableCell>
                                    <TableCell sx={{ textAlign: 'justify' }}>AA</TableCell>
                                    <TableCell sx={{ textAlign: 'justify' }}>AA</TableCell>
                                </TableRow>
                            {/* ))} */}
                        </TableBody>
                    </Table>
                </TableContainer>
                    
                {/* <TablePagination
                    rowsPerPageOptions={[3]}
                    component="div"
                    count={businessProfiles.length}
                    rowsPerPage={businessRowsPerPage}
                    page={businessPage}
                    onPageChange={handleBusinessPageChange}
                    onRowsPerPageChange={handleBusinessRowsPerPageChange}/> */}
                </Box>
            </Grid>

            {/* Right Box */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ p: 6, borderRadius: 2, background: '#F2F2F2'}}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Discover Opportunities</Typography>
                  <Typography variant="h6">Explore new ventures and opportunities that match your interests.</Typography>
                  <Button variant="outlined" fullWidth component={Link} to="/companies" sx={{mt: 3, color: 'rgba(0, 116, 144, 1)', borderColor: 'rgba(0, 116, 144, 1)', '&:hover': { color: 'rgba(0, 116, 144, 0.7)', borderColor: 'rgba(0, 116, 144, 0.7)'}}}>
                    Check Companies
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default FoundingRoundView;
