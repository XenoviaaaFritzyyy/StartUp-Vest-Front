import { useState } from 'react';
import Navbar from "../Navbar/Navbar";
import { Box, Typography, Toolbar, Button, Select, MenuItem, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';


import CreateFundingRound from '../Form/CreateFundingRound';

const drawerWidth = 240;

function UserDashboard() {
    const [openCreateFundingRound, setOpenCreateFundingRound] = useState(false);

    const handleOpenFundingRound = () => {
        setOpenCreateFundingRound(true);
    };

    const handleCloseFundingRound = () => {
        setOpenCreateFundingRound(false);
    };

    return (
        <>
            <Navbar />
            <Toolbar />

            <style>{`
                body {
                    background-color: #D3D3D3;
                }
            `}</style>

            <Box component="main" sx={{ display: 'flex', flexGrow: 1, p: 4, paddingLeft: `${drawerWidth}px`, width: '100%', overflowX: 'hidden' }}>
                {/* Left Box */}
                <Box sx={{ flex: 1, background: 'white', display: 'flex', alignItems: 'center', flexDirection: 'column', ml: 3, borderRadius: 2, p: 5 }}>
                    <Typography variant="h5">Followed Companies/People</Typography>

                    <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
                        <Grid item>
                            <Typography variant="h6">Filter By:</Typography>
                        </Grid>
                        <Grid item>
                            <Select defaultValue="All" variant="outlined" sx={{ minWidth: 120 }}> {/* Adjust the minWidth to your desired width */}
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Startup">Startup</MenuItem>
                                <MenuItem value="Investor">Investor</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <TableContainer component={Box} sx={{ mt: 2, backgroundColor: 'white', borderRadius: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Industry</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Facebook</TableCell>
                                    <TableCell>Technology</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                {/* Right Boxes */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 2 }}>
                    {/* Box for Create Funding Round Button */}
                    <Box sx={{ borderRadius: 4, mb: 2}}>
                        <Button variant="contained" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { backgroundColor: 'rgba(0, 116, 144, 0.8)' }, color: '#fff' }} fullWidth onClick={handleOpenFundingRound}>
                            Create Funding Round
                        </Button>
                    </Box>

                    {/* Box for Find New Companies Button */}
                    <Box sx={{ background: 'white', p: 9, borderRadius: 2 }}>
                        <Typography variant="h5">Find New Companies</Typography>
                        <Typography variant="h6">Connect with the right people at qualified companies.</Typography>

                        <Box sx={{ mt: 2 }}>
                            {/* Wrap the button with Link */}
                            <Button variant="outlined" fullWidth component={Link} to="/companies">
                                Get Started
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Table */}
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, pr: 7, pb: 5, pl: `${drawerWidth}px`, width: '100%', overflowX: 'hidden', backgroundColor: '#D3D3D3' }}>
                <Typography variant="h4" sx={{ pl: 4, color: 'rgba(0, 116, 144, 1)', fontWeight: 'bold' }}>
                    My Companies
                </Typography>

                <TableContainer component={Box} sx={{ backgroundColor: 'white', borderRadius: 2, ml: 3, mt: 2}}>
                    <Table>
                        <TableHead sx={{ backgroundColor: 'rgba(0, 116, 144, 0.1)'}}>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center' }}>Name</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>Industry</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>Location</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>Description</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>Funding Round</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center' }}>Facebook</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>Technology</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>Technology</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>Technology</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Button variant="outlined" sx={{ color: 'rgba(0, 116, 144, 1)', borderColor: 'rgba(0, 116, 144, 1)' }}>View</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Custom Full Page Dialog for Creating Funding Round */}
            {openCreateFundingRound && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1300,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
            
                <Box
                    sx={{
                        background: '#F2F2F2',
                        maxWidth: '100%',
                        maxHeight: '90%',
                        overflowY: 'auto',
                        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'}}>

                    <CreateFundingRound />

                    <DialogActions>
                        <Box sx={{ display: 'flex', mt: 1, mb: 1, mr: 5}}>
                            <Button variant="text" sx={{ mr: 2 , color: 'rgba(0, 116, 144, 1)'}} onClick={handleCloseFundingRound}>
                                Cancel
                            </Button>

                            <Button variant="contained" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { backgroundColor: 'rgba(0, 116, 144, 0.8)' }, color: '#fff' }}>
                                Create
                            </Button>
                        </Box>
                    </DialogActions>
                </Box>
            </Box>
            )}
        </>
    );
}

export default UserDashboard;
