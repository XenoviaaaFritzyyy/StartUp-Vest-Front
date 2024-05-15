import { useEffect, useState } from 'react';
import Navbar from "../Navbar/Navbar";
import { Box, Typography, Toolbar, Button, Select, MenuItem, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, DialogActions, FormControl, InputLabel } from '@mui/material';
import { Link } from 'react-router-dom';


import CreateFundingRound from '../Form/CreateFundingRound';
import CreateCapTable from '../Form/CreateCapTable';
import axios from 'axios';

const drawerWidth = 240;

function UserDashboard() {
    const [openCreateFundingRound, setOpenCreateFundingRound] = useState(false);
    const [openCapTable, setOpenCapTable] = useState(false);

    const [filter, setFilter] = useState('All'); // Add this line

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        gender: '',
        avatar: '',
    });

    const [businessProfiles, setBusinessProfiles] = useState([]);
    // const [selectedBusinessProfile, setSelectedBusinessProfile] = useState(null);

    useEffect(() => {
        // fetchUserData();
        fetchBusinessProfiles();
    }, []);

    const handleOpenFundingRound = () => {
        setOpenCreateFundingRound(true);
    };

    const handleCloseFundingRound = () => {
        setOpenCreateFundingRound(false);
    };

    const handleOpenCapTable = () => {
        setOpenCapTable(true);
    }
    
    const handleCloseCapTable = () => {
        setOpenCapTable(false);
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // const fetchUserData = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3000/users/profile', {
    //             headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //             },
    //         });
    
    //     setUserData(response.data);
    //         } catch (error) {
    //             console.error('Failed to fetch user data:', error);
    //         }
    //     };

    const fetchBusinessProfiles = async () => {
        try {
            const responseStartups = await axios.get(`http://localhost:3000/startups`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const responseInvestors = await axios.get(`http://localhost:3000/investors`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

    
            const startups = responseStartups.data.map(profile => ({ ...profile, type: 'Startup' }));
            const investors = responseInvestors.data.map(profile => ({ ...profile, type: 'Investor' }));
    
            setBusinessProfiles([...startups, ...investors]);
        } catch (error) {
            console.error('Failed to fetch business profiles:', error);
        }
    };

    return (
        <>
            <Navbar />
            <Toolbar />

            <style>{`
                body {
                background-color: #D3D3D3; /* Set your desired background color */
                }
            `}</style>

            <Box component="main" sx={{ display: 'flex', flexGrow: 1, p: 4, paddingLeft: `${drawerWidth}px`, width: '100%', overflowX: 'hidden' }}>

                {/* Left Box */}
                <Box sx={{ flex: 2, background: 'white', display: 'flex', alignItems: 'center', flexDirection: 'column', ml: 3, borderRadius: 2, p: 5 }}>
                    <Typography variant="h5">Followed Companies/People</Typography>

                    <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
                        <Grid item>
                            <Typography variant="h6">Filter By:</Typography>
                        </Grid>
                        <Grid item>
                            <Select value={filter} onChange={handleFilterChange} variant="outlined" sx={{ minWidth: 150 }}>
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
                                    <TableCell sx={{ textAlign: 'center' }}>Name</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>Information</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {businessProfiles.filter(profile => filter === 'All' || profile.type === filter).map((profile) => (
                                    <TableRow key={`${profile.type}-${profile.id}`}>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.companyName || profile.lastName}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.industry || profile.emailAddress}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.companyDescription || profile.biography}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                {/* Right Boxes */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 2 }}>
                    {/* Box for Create Funding Round Button */}
                    <Box sx={{ borderRadius: 4, mb: 2}}>
                        <Button variant="contained" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { backgroundColor: 'rgba(0, 116, 144, 0.8)' }, color: '#fff', mb: 1 }} fullWidth onClick={handleOpenFundingRound}>
                            Create Funding Round
                        </Button>

                        <Button variant="outlined" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { backgroundColor: 'rgba(0, 116, 144, 0.8)' }, color: '#fff' }} fullWidth onClick={handleOpenCapTable}>
                            Create Cap Table
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
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 3 }}>
                    <Typography variant="h4" sx={{ pl: 4, color: 'rgba(0, 116, 144, 1)', fontWeight: 'bold' }}>
                        My Founding Round
                    </Typography>

                    <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ pr: 1 }}>Filter by Company:</Typography>
                        <FormControl sx={{ minWidth: 120 }}>
                            <Select defaultValue="All" variant="outlined" sx={{ minWidth: 150 }}>
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Startup">Startup</MenuItem>
                                <MenuItem value="Investor">Investor</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <TableContainer component={Box} sx={{ backgroundColor: 'white', borderRadius: 2, ml: 3, mt: 2}}>
                    <Table>
                        <TableHead sx={{ backgroundColor: 'rgba(0, 116, 144, 0.1)'}}>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center' }}>Funding Type</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>Money Raised</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>Target Funding</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>Action</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center' }}>Seed A</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>100,000</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>500,000</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Button variant="outlined" sx={{ color: 'rgba(0, 116, 144, 1)', borderColor: 'rgba(0, 116, 144, 1)' }} onClick={handleOpenFundingRound}>View</Button>
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Button variant="outlined" sx={{ color: 'rgba(0, 116, 144, 1)', borderColor: 'rgba(0, 116, 144, 1)' }}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

                    {/* Table */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, pr: 7, pb: 5, pl: `${drawerWidth}px`, width: '100%', overflowX: 'hidden', backgroundColor: '#D3D3D3' }}>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 3 }}>
                        <Typography variant="h4" sx={{ pl: 4, color: 'rgba(0, 116, 144, 1)', fontWeight: 'bold' }}>
                            My Cap Table
                        </Typography>

                    <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ pr: 1 }}>Filter by Company:</Typography>
                        <FormControl sx={{ minWidth: 120 }}>
                            <Select defaultValue="All" variant="outlined" sx={{ minWidth: 150 }}>
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Startup">Startup</MenuItem>
                                <MenuItem value="Investor">Investor</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <TableContainer component={Box} sx={{ backgroundColor: 'white', borderRadius: 2, ml: 3, mt: 2}}>
                    <Table>
                        <TableHead sx={{ backgroundColor: 'rgba(0, 116, 144, 0.1)'}}>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center' }}>Shareholder's Name</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>Title</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>Total Share</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>Percentage</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>Action</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center' }}>Hazelyn Balingcasag</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>CEO</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>50,000</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>10%</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Button variant="outlined" sx={{ color: 'rgba(0, 116, 144, 1)', borderColor: 'rgba(0, 116, 144, 1)' }} onClick={handleOpenCapTable}>View</Button>
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Button variant="outlined" sx={{ color: 'rgba(0, 116, 144, 1)', borderColor: 'rgba(0, 116, 144, 1)' }}>Delete</Button>
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

            {/* Custom Full Page Dialog for Creating Funding Round */}
            {openCapTable && (
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

                    <CreateCapTable />

                    <DialogActions>
                        <Box sx={{ display: 'flex', mt: 1, mb: 1, mr: 5}}>
                            <Button variant="text" sx={{ mr: 2 , color: 'rgba(0, 116, 144, 1)'}} onClick={handleCloseCapTable}>
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
