import React, { useState } from 'react';
import { Avatar, Box, Divider, Toolbar, Typography, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, DialogActions, FormControl, TablePagination } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const drawerWidth = 240;

function FundingRoundView() {
  const [isFollowed, setIsFollowed] = useState(false);

  const location = useLocation();
  const { fundinground } = location.state || {};

  console.log('Funding Round Data:', fundinground); 

  if (!fundinground) {
    return <div>No funding round data available</div>;
  }

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
          <Typography variant="h4" gutterBottom>{fundinground.fundingType} - {fundinground.startupName}</Typography>
          <StarsIcon sx={{ cursor: 'pointer', ml: 1, mt: -1, color: isFollowed ? 'rgba(0, 116, 144, 1)' : 'inherit' }} onClick={handleFollowToggle} />
        </Box>

        <Divider sx={{ mt: 5 }} />

        <Box component="main" sx={{ display: 'flex', flexGrow: 1, p: 4, width: '100%', overflowX: 'hidden' }}>
          <Grid container spacing={2}>
            {/* Left Box. Investor Information */}
            <Grid item xs={12} md={8}>
              <Box sx={{ background: 'white', display: 'flex', flexDirection: 'column', borderRadius: 2, pb: 3, pl: 5, pr: 5 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)', mb: 2 }}>Overview</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                          To invest in our company, a minimum purchase of 10,000 shares is required. This ensures a meaningful investment and supports our long-term growth.
                          <br /><br />
                          For more information, please contact us.
                         </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography><strong>StartUp Name</strong></Typography>
                        <Typography variant="body1">{fundinground.startupName}</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography><strong>Announced Date</strong></Typography>
                        <Typography variant="body1">{fundinground.announcedDate}</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography><strong>Closed on Date</strong></Typography>
                        <Typography variant="body1">{fundinground.closedDate}</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography><strong>Funding Type</strong></Typography>
                        <Typography variant="body1">{fundinground.fundingType}</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography><strong>Money Raised</strong></Typography>
                        <Typography variant="body1">{fundinground.moneyRaisedCurrency} {fundinground.moneyRaised}</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography><strong>Pre-Money Valuation</strong></Typography>
                        <Typography variant="body1">
                          {fundinground.preMoneyValuation ? fundinground.preMoneyValuation : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Divider sx={{ mt: 5, mb: 3 }} />

                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'rgba(0, 116, 144, 1)', }}>Investors</Typography>
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
                      {/* Loop through each capTableInvestor */}
                      {fundinground.capTableInvestors && fundinground.capTableInvestors.map((investorDetail, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {investorDetail.investor.firstName} {investorDetail.investor.lastName}
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{investorDetail.title}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{investorDetail.shares}</TableCell>
                        </TableRow>
                      ))}
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
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default FundingRoundView;
