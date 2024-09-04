import { useEffect, useState } from 'react';
import axios from 'axios';
import StarsIcon from '@mui/icons-material/Stars';
import { Box, Typography, Toolbar, Grid, Button, Menu, MenuItem,Tabs, Tab, ListItemText, List, ListItemIcon, ListItem } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import StarIcon from '@mui/icons-material/Star';
import Person2Icon from '@mui/icons-material/Person2';
import HistoryIcon from '@mui/icons-material/History'; 

import Navbar from "../Navbar/Navbar";
import CreateFundingRoundDialog from '../Dialogs/CreateFundingRoundDialog';
import CreateBusinessProfileDialog from '../Dialogs/CreateBusinessProfileDialog';
import BusinessProfileTable from '../Tables/BusinessProfileTable';
import FundingRoundTable from '../Tables/FundingRoundTable';
import CapTable from '../Tables/CapTableTable';

const drawerWidth = 300;

function UserDashboard() {
    const [tabValue, setTabValue] = useState(0);

    // PROFILE
    const [openCreateBusinessProfile, setCreateBusinessProfile] = useState(false);
    const [businessProfiles, setBusinessProfiles] = useState([]);
    const [selectedBusinessProfile, setSelectedBusinessProfile] = useState(null);
    const [openViewStartup, setOpenViewStartup] = useState(false);
    const [openViewInvestor, setOpenViewInvestor] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [profileToDelete, setProfileToDelete] = useState(null);

    // FUNDING ROUND
    const [openCreateFundingRound, setOpenCreateFundingRound] = useState(false);
    const [fundingRounds, setFundingRounds] = useState([]);
    const [selectedFundingRoundDetails, setSelectedFundingRoundDetails] = useState(null);
    const [openViewFundingRound, setOpenViewFundingRound] = useState(false);
    const [filteredFundingRounds, setFilteredFundingRounds] = useState([]);

    // CAP TABLE
    const [selectedStartupCapTable, setSelectedStartupCapTable] = useState('All');
    const [capTables, setCapTables] = useState([]);
    const [filteredCapTables, setFilteredCapTables] = useState([]);

    // COUNTS
    const [fundedCompaniesCount, setFundedCompaniesCount] = useState(0);
    const [companyCount, setCompanyCount] = useState(0);
    const [investorCount, setInvestorCount] = useState(0);
    // const [fundingRoundCount, setFundingRoundCount] = useState(0);
    const [totalAmountFunded, setTotalAmountFunded] = useState(0);

    const [recentActivities, setRecentActivities] = useState([]);
    
    useEffect(() => {
        fetchBusinessProfiles();
        fetchFundingRounds();
        fetchCapTable();
        fetchCapTablesAllInvestors();
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // PROFILE
    const handleOpenBusinessProfile = () => {
        setCreateBusinessProfile(true);
      };
    
      const handleCloseBusinessProfile = () => {
        setCreateBusinessProfile(false);
        fetchBusinessProfiles();
      };

    const handleOpenStartUp = (profile) => {
        setSelectedBusinessProfile(profile);
        setOpenViewStartup(true);
    };
    
    const handleCloseStartUp = () => {
        setOpenViewStartup(false);
    };
    
    const handleOpenInvestor = (profile) => {
        setSelectedBusinessProfile(profile);
        setOpenViewInvestor(true);
    };    

    const handleCloseInvestor = () => {
        setOpenViewInvestor(false);
    };  
    
    const handleOpenDeleteDialog = (profile) => {
        setProfileToDelete(profile);
        setOpenDeleteDialog(true);
    };
    
    const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    };

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

            const startups = responseStartups.data.filter(profile => !profile.isDeleted).map(profile => ({ ...profile, type: 'Startup' }));
            const investors = responseInvestors.data.filter(profile => !profile.isDeleted).map(profile => ({ ...profile, type: 'Investor' }));
    
            setBusinessProfiles([...investors, ...startups]);

            // Update counts
            setCompanyCount(startups.length);
            setInvestorCount(investors.length);
            setFundedCompaniesCount(investors.length > 0 ? 1 : 0); // Example logic, adjust based on your criteria
        } catch (error) {
            console.error('Failed to fetch business profiles:', error);
        }
    };

    const handleSoftDelete = async () => {
        if (!profileToDelete) {
            console.error('No profile selected');
            return;
        }

        try {
            const endpoint = `http://localhost:3000/startups/${profileToDelete.id}/delete`;

            await axios.put(endpoint, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            fetchBusinessProfiles();

            // Add recent activity
            setRecentActivities(prevActivities => [
                { action: 'Deleted Business Profile', description: `${profileToDelete.companyName} was deleted`, date: new Date().toLocaleDateString() },
                ...prevActivities.slice(0, 4) // Limit to 5 recent activities
            ]);
        } catch (error) {
            console.error('Failed to delete profile:', error);
        }
    };
    
    // FUNDING ROUND
    const handleOpenFundingRound = () => {
        setOpenCreateFundingRound(true);
    };

    const handleCloseFundingRound = () => {
        setOpenCreateFundingRound(false);
        fetchFundingRounds();

        // Add recent activity
        setRecentActivities(prevActivities => [
            { action: 'Created Funding Round', description: 'A new funding round was created', date: new Date().toLocaleDateString() },
            ...prevActivities.slice(0, 4) // Limit to 5 recent activities
        ]);
    };

    const handleCloseFundingProfile = () => {
        setOpenViewFundingRound(false);
    }

    const handleViewFundingRound = async (fundingRoundId) => {
        try {
            const response = await axios.get(`http://localhost:3000/funding-rounds/${fundingRoundId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log('Funding Round Details:', response.data);
            setSelectedFundingRoundDetails(response.data);
            setOpenViewFundingRound(true);
        } catch (error) {
            console.error('Error fetching funding round details:', error);
        }
    };

    const handleSoftDeleteFundingRound = async (fundingRoundId) => {
        try {
            await axios.delete(`http://localhost:3000/funding-rounds/${fundingRoundId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Remove the deleted funding round from the state to update the UI
            const updatedFundingRounds = fundingRounds.filter(round => round.id !== fundingRoundId);
            setFundingRounds(updatedFundingRounds);
            setFilteredFundingRounds(updatedFundingRounds);

            // Add recent activity
            setRecentActivities(prevActivities => [
                { action: 'Delete Funding Round', description: 'A new funding round was deleted', date: new Date().toLocaleDateString() },
                ...prevActivities.slice(0, 4) // Limit to 5 recent activities
            ]);
        } catch (error) {
            console.error('Failed to soft delete funding round:', error);
        }
    };

    const fetchFundingRounds = async () => {
        try {
            const response = await axios.get('http://localhost:3000/funding-rounds/all', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setFundingRounds(response.data);
            setFilteredFundingRounds(response.data);
            // Calculate the total amount funded
            const totalFunded = fundingRounds.reduce((total, round) => total + round.amount, 0);
            setTotalAmountFunded(totalFunded);
        } catch (error) {
            console.error('Error fetching funding rounds:', error);
        }
    };

    // CAP TABLE
    useEffect(() => {
        if (selectedStartupCapTable === 'All') {
            fetchCapTablesAllInvestors();
        } else {
            fetchCapTable(selectedStartupCapTable);
        }
    }, [selectedStartupCapTable]);

    const fetchCapTable = async (companyId) => {
        try {
            const response = await axios.get(`http://localhost:3000/funding-rounds/investors/${companyId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
    
            if (response.data.length === 0) {
                // Handle the "No investors found" scenario
                setCapTables([]);
                setFilteredCapTables([]);
            } else {
                setCapTables(response.data);
                setFilteredCapTables(response.data);
            }
        } catch (error) {
            console.error('Error fetching investors:', error);
        }
    };
    

    const fetchCapTablesAllInvestors = async () => {
        try {
            const response = await axios.get('http://localhost:3000/funding-rounds/investors/all', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setCapTables(response.data);
            setFilteredCapTables(response.data);
        } catch (error) {
            console.error('Error fetching funding rounds:', error);
        }
    };

    const handleStartupChangeCapTable = (event) => {
        const selectedCompanyId = event.target.value;
        setSelectedStartupCapTable(selectedCompanyId);
        fetchCapTable(selectedCompanyId);
        fetchCapTablesAllInvestors(selectedCompanyId);
    };

    return (
        <>
            <Navbar />
            <Toolbar />

            <Box 
                component="main" 
                sx={{ display: 'flex', flexGrow: 1, pr: 7, pt: 5, pb: 8, paddingLeft: `${drawerWidth}px`, overflowX: 'hidden' }}>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="h5">User Dashboard</Typography>
                            <PopupState variant="popover" popupId="demo-popup-menu">
                                {(popupState) => (
                                    <>
                                        <Button variant="contained" startIcon={<StarsIcon />} {...bindTrigger(popupState)} 
                                        sx={{ width: '150px', backgroundColor: '#007490', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' } }}>Create</Button>
                                        <Menu {...bindMenu(popupState)}>
                                            <MenuItem onClick={handleOpenBusinessProfile}>Business Profile</MenuItem>
                                            <MenuItem onClick={handleOpenFundingRound}>Funding Round</MenuItem>
                                        </Menu>
                                    </>
                                )}
                            </PopupState>
                        </Box>
                    </Grid>

                    {/* Top Row - 5 Boxes */}
                    <Grid item xs={12} sm={3}>
                        <Box sx={{ background: 'linear-gradient(to bottom, #0093d0, #00779d, #005b6e)', color: 'white', height: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Typography>Funded Companies</Typography>
                            <Typography variant="h5">{fundedCompaniesCount} out of {companyCount}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <Box sx={{ background: 'linear-gradient(to bottom, #0093d0, #00779d, #005b6e)', color: 'white', height: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Typography>Company Count</Typography>
                            <Typography variant="h5">{companyCount}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <Box sx={{ background: 'linear-gradient(to bottom, #0093d0, #00779d, #005b6e)', color: 'white', height: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Typography>Investor Count</Typography>
                            <Typography variant="h5">{investorCount}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <Box sx={{ background: 'linear-gradient(to bottom, #0093d0, #00779d, #005b6e)', color: 'white', height: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Typography>Funding Rounds</Typography>
                            <Typography variant="h5">{fundedCompaniesCount}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Box sx={{ background: 'linear-gradient(to bottom, #0093d0, #00779d, #005b6e)', color: 'white', height: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Typography>Total Amount Funded</Typography>
                            <Typography variant="h5">{totalAmountFunded.toLocaleString()}</Typography>
                        </Box>
                    </Grid>

                    {/* Middle Row - Two Boxes */}
                    <Grid item xs={12} sm={9}>
                        <Box sx={{ backgroundColor: 'white', height: 420, display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                        <Typography variant="h6"
                            sx={{ p: 1 , background: 'linear-gradient(to top, #0093d0, #00779d, #005b6e)', color: 'white', fontWeight: 'bold' }}>
                               Total Investment Graph
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Box sx={{ backgroundColor: 'white', height: 420, display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                            <Typography variant="h6"
                            sx={{ p: 1 , background: 'linear-gradient(to top, #0093d0, #00779d, #005b6e)', color: 'white', fontWeight: 'bold' }}>
                                Recent Activity
                            </Typography>
                            
                             <List sx={{ pl: 1, overflowY: 'auto', flex: 1 }}>
                                {recentActivities.length === 0 ? (
                                    <ListItem>
                                        <ListItemText primary="No recent activity" />
                                    </ListItem>
                                ) : (
                                    recentActivities.map((activity, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={activity.action} secondary={`${activity.description} - ${activity.date}`} />
                                        </ListItem>
                                    ))
                                )}
                            </List>
                        </Box>
                    </Grid>

                    {/* Bottom Row - Two Boxes */}
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ background: 'linear-gradient(135deg, #0093d0, #005b6e)', height: 100, display: 'flex',  flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 3, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.2)', position: 'relative', overflow: 'hidden' }}>
                            <Box sx={{ position: 'absolute', top: 15, right: 15, width: 60, height: 60, borderRadius: '50%',backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)', zIndex: 1, transform: 'rotate(15deg)', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'rotate(0deg)', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.6)'}}}>
                                <StarIcon sx={{ color: '#005b6e', fontSize: 36, filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))' }} />
                            </Box>
                            <Typography sx={{ color: '#ffffff', textAlign: 'center', fontSize: 14, mb: 0.5 }}>
                                Highest-Funded Company
                            </Typography>
                            <Typography variant="h5" sx={{  color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>
                                Shell Company
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box sx={{ background: 'linear-gradient(135deg, #0093d0, #005b6e)', height: 100, display: 'flex',  flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 3, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.2)', position: 'relative', overflow: 'hidden', mb: 5 }}>
                            <Box sx={{ position: 'absolute', top: 15, right: 15, width: 60, height: 60, borderRadius: '50%',backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)', zIndex: 1, transform: 'rotate(15deg)', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'rotate(0deg)', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.6)'}}}>
                                <Person2Icon sx={{ color: '#005b6e', fontSize: 36, filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))' }} />
                        </Box>
                            <Typography sx={{ color: '#ffffff', textAlign: 'center', fontSize: 14, mb: 0.5 }}>
                                Top Investment Contributor
                            </Typography>
                            <Typography variant="h5" sx={{  color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>
                                Hazelyn Balingcasag
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="tabs" sx={{ '& .MuiTabs-indicator': { backgroundColor: '#007490' } }}>
                        <Tab label="My Profile" sx={{ color: tabValue === 0 ? '#007490' : 'text.secondary', '&.Mui-selected': {
                            color: '#007490' } }}/>
                        <Tab label="My Funding Round" sx={{ color: tabValue === 1 ? '#007490' : 'text.secondary', '&.Mui-selected': {
                            color: '#007490' } }}/>
                        <Tab label="My Captable" sx={{ color: tabValue === 2 ? '#007490' : 'text.secondary', '&.Mui-selected': {
                            color: '#007490' } }}/>
                    </Tabs>

                    <Box sx={{ pt: 3}}>
                        {tabValue === 0 && (
                            <BusinessProfileTable 
                                businessProfiles={businessProfiles}
                                handleOpenStartUp={handleOpenStartUp}
                                handleOpenInvestor={handleOpenInvestor}
                                handleOpenDeleteDialog={handleOpenDeleteDialog}
                                selectedBusinessProfile={selectedBusinessProfile}
                                openViewStartup={openViewStartup}
                                openViewInvestor={openViewInvestor}
                                openDeleteDialog={openDeleteDialog}
                                handleCloseStartUp={handleCloseStartUp}
                                handleCloseInvestor={handleCloseInvestor}
                                handleCloseDeleteDialog={handleCloseDeleteDialog}
                                handleSoftDelete={handleSoftDelete}
                                profileToDelete={profileToDelete}/>                            
                            )}
                            
                            {tabValue === 1 && (
                                <FundingRoundTable 
                                    filteredFundingRounds={filteredFundingRounds}
                                    fundingRounds={fundingRounds}
                                    handleViewFundingRound={handleViewFundingRound}
                                    handleSoftDeleteFundingRound={handleSoftDeleteFundingRound}
                                    selectedFundingRoundDetails={selectedFundingRoundDetails}
                                    openViewFundingRound={openViewFundingRound}
                                    handleCloseFundingRound={handleCloseFundingRound}
                                    handleCloseFundingProfile={handleCloseFundingProfile}
                                    businessProfiles={businessProfiles}
                                    onTotalAmountFundedChange={setTotalAmountFunded} />
                            )}

                            {tabValue === 2 && (
                            <CapTable 
                                filteredCapTables={filteredCapTables}
                                businessProfiles={businessProfiles} 
                                selectedStartupCapTable={selectedStartupCapTable} 
                                handleStartupChangeCapTable={handleStartupChangeCapTable} />
                            )}
                    </Box>
                </Grid>
                </Grid>
            </Box>

            <CreateBusinessProfileDialog open={openCreateBusinessProfile} onClose={handleCloseBusinessProfile} />
            <CreateFundingRoundDialog open={openCreateFundingRound} onClose={handleCloseFundingRound} />
        </>
    );
}

export default UserDashboard;